import { FormProvider, useForm } from 'react-hook-form';
import UploadDropDown from './UploadDropDown';
import { useUserProfile } from '../hooks/userProfile';
import axios from 'axios';
import { parseJwt } from '../hooks/useDecodeToken';
import { userStore } from '../stores/userStore';
import Cookies from 'js-cookie';
import { useNicknameDuplicate } from '../hooks/useNicknameDuplicate';
import { useState } from 'react';
import Image from 'next/image';

interface UserProfileForm {
    profile: FileList;
    nickname: string;
    category: string;
}

const MypageUserProfile = () => {
    const method = useForm<UserProfileForm>({
        mode: 'onSubmit',
        shouldFocusError: true,
    });

    const { getValues, setError, watch } = method;
    const watchedNickname = watch('nickname', '');

    const [checkedNickname, setCheckedNickname] = useState('');
    const [checking, setChecking] = useState(false);

    const categoryArr = ['FE', 'BE'];
    const mutateUser = useUserProfile();
    const mutateDuplicate = useNicknameDuplicate();
    const user = userStore((state) => state.user);

    const onBlurDuplicate = async () => {
        const nickname = (getValues('nickname') || '').trim();
        console.log('onBlurDuplicate 호출, nickname:', nickname);

        if (!nickname) {
            setCheckedNickname('');
            setError('nickname', {
                type: 'required',
                message: '닉네임을 입력해주세요.',
            });
            return;
        }

        try {
            setChecking(true);

            const data = await mutateDuplicate.mutateAsync(nickname);
            console.log('중복 체크 결과:', data);

            const usable = typeof data === 'string' ? data.includes('사용 가능') : !!data?.usable;

            if (usable) {
                setCheckedNickname(nickname);
                setError('nickname', {
                    type: 'success',
                    message: typeof data === 'string' ? data : '사용 가능한 닉네임입니다.',
                });
            } else {
                setCheckedNickname('');
                setError('nickname', {
                    type: 'duplicate',
                    message: typeof data === 'string' ? data : '중복된 닉네임입니다.',
                });
            }
        } catch (err) {
            console.error('중복 체크 오류:', err);
            setCheckedNickname('');
            setError('nickname', {
                type: 'server',
                message: 'API 호출 오류',
            });
        } finally {
            setChecking(false);
        }
    };

    const onSubmit = async (data: UserProfileForm) => {
        const trimmedNickname = (data.nickname || '').trim();
        const hasProfile = data.profile && data.profile.length > 0;
        const hasNickname = !!trimmedNickname;
        const hasCategory = !!data.category?.trim();

        console.log(
            'submit called. checkedNickname:',
            checkedNickname,
            'input nickname:',
            trimmedNickname,
            'checking:',
            checking,
        );

        if (checking) {
            setError('nickname', {
                type: 'pending',
                message: '중복 확인이 진행 중입니다. 잠시만 기다려주세요.',
            });
            return;
        }

        if (hasNickname && checkedNickname !== trimmedNickname) {
            setError('nickname', {
                type: 'duplicate',
                message: '닉네임 중복 확인이 필요합니다.',
            });
            return;
        }

        if (!hasProfile && !hasNickname && !hasCategory) {
            setError('root', {
                type: 'required',
                message: '변경사항이 없습니다.',
            });
            return;
        }

        try {
            const token = Cookies.get('accessToken');
            const formdata = new FormData();

            if (data.profile?.[0]) formdata.append('profile', data.profile[0]);
            if (hasNickname) formdata.append('nickname', trimmedNickname);
            if (hasCategory) formdata.append('job', data.category);
            console.log(Array.from(formdata.entries()));

            await mutateUser.mutateAsync(formdata);

            const response = await axios.get('/api/user-me', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const jwt = response.data.data;
            Cookies.set('accessToken', jwt);
            const decode = parseJwt(jwt);
            userStore.getState().setUser(decode);
        } catch (err) {
            console.error('프로필 수정 에러:', err);
            setError('root', {
                type: 'server',
                message: '프로필 수정 중 오류가 발생했습니다.',
            });
        }
    };

    const { ref, name, onBlur, onChange } = method.register('nickname', { maxLength: 10 });

    const nicknameNeedsCheck =
        !!watchedNickname?.trim() && checkedNickname !== watchedNickname.trim();

    return (
        <main className="flex flex-col w-full gap-[50px] relative h-full">
            <FormProvider {...method}>
                <form onSubmit={method.handleSubmit(onSubmit)} className="flex flex-col gap-[40px]">
                    <section className="w-[500px] flex flex-col gap-[16px]">
                        <h1 className="text-[36px] font-bold">프로필 수정</h1>
                        <label htmlFor="profile" className="text-gray-500">
                            * 10MB 이내의 파일을 업로드 해주세요.
                        </label>
                        <div className="w-full flex gap-[32px]">
                            <div className="min-w-[92px] min-h-[92px] relative rounded-full">
                                <Image
                                    src={`https://port-cloud.com/img/${user.profileUrl}`}
                                    alt="profile"
                                    fill
                                    className="object-cover rounded-full"
                                />
                            </div>

                            <input
                                type="file"
                                {...method.register('profile')}
                                className="w-full border-none rounded-[8px]"
                            />
                        </div>
                    </section>

                    <section className="flex flex-col gap-[12px]">
                        <h1 className="text-[20px] font-bold">닉네임</h1>
                        <div className="flex w-full gap-[12px]">
                            <input
                                type="text"
                                className="border w-full min-h-[64px] rounded-[8px] p-[20px]"
                                name={name}
                                ref={ref}
                                minLength={3}
                                maxLength={19}
                                placeholder="닉네임 변경시 중복확인이 필요합니다."
                                onChange={(e) => {
                                    onChange(e);
                                    // 닉네임 변경 시 검증 초기화
                                    setCheckedNickname('');
                                }}
                                onBlur={(e) => {
                                    onBlur(e);
                                    onBlurDuplicate();
                                }}
                            />
                        </div>

                        {method.formState.errors.nickname && (
                            <p
                                className={`${method.formState.errors.nickname.message?.includes('사용 가능') ? 'text-green-500' : 'text-red-500'}`}
                            >
                                {method.formState.errors.nickname.message}
                            </p>
                        )}
                    </section>

                    <section className="w-full flex flex-col items-center">
                        <UploadDropDown
                            arr={categoryArr}
                            dropDownLabel={'관심 직군'}
                            dropDownPlaceholoder={'관심 직군을 선택해주세요.'}
                            width={'min-w-[1024px]'}
                            height={'min-h-[64px]'}
                            labelText={'text-[20px] font-bold'}
                            labelFont={'text-[16px]'}
                            gap={'gap-[12px]'}
                            name={'category'}
                        />
                        {method.formState.errors.root && (
                            <p className="text-red-500 flex mt-16 ">
                                {method.formState.errors.root.message}
                            </p>
                        )}
                    </section>

                    <div>
                        <button
                            type="submit"
                            disabled={nicknameNeedsCheck || checking}
                            className={`absolute bottom-0 right-0 justify-center max-w-[248px] min-h-[48px] items-center px-[96px] text-[14px] font-semibold rounded-[8px] cursor-pointer ${
                                nicknameNeedsCheck || checking
                                    ? 'bg-gray-300 text-gray-700 cursor-not-allowed'
                                    : 'bg-purple-500 text-white'
                            }`}
                        >
                            {checking ? '중복확인 중...' : '수정하기'}
                        </button>
                    </div>
                </form>
            </FormProvider>
        </main>
    );
};

export default MypageUserProfile;
