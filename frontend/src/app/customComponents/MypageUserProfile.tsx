import { FormProvider, useForm } from 'react-hook-form';
import UploadDropDown from './UploadDropDown';
import { useUserProfile } from '../hooks/userProfile';
interface UserProfileForm {
    profile: FileList;
    nickname: string;
}

const MypageUserProfile = () => {
    const method = useForm<UserProfileForm>();
    const categoryArr = ['FE', 'BE'];
    const mutateUser = useUserProfile();

    const onSubmit = (data: UserProfileForm) => {
        const formdata = new FormData();
        formdata.append('profile', data.profile[0]);
        mutateUser.mutate(formdata);
    };
    return (
        <main className="flex flex-col w-full gap-[50px]">
            <FormProvider {...method}>
                <form onSubmit={method.handleSubmit(onSubmit)}>
                    <section className="w-[374px] flex flex-col gap-[16px]">
                        <h1 className="text-[36px] font-bold">프로필 수정</h1>
                        <div className="w-full flex">
                            <div className="w-[92px] h-[92px]">프로필사진</div>
                            <input
                                type="file"
                                {...method.register('profile')}
                                className="w-[250px] border rounded-[8px]"
                            />
                        </div>
                    </section>
                    <section className="flex flex-col gap-[12px]">
                        <h1 className="text-[20px] font-bold">닉네임</h1>
                        <div className="flex w-full gap-[12px]">
                            <input
                                type="text"
                                className="border w-full min-h-[64px] rounded-[8px] p-[20px]"
                                {...method.register('nickname')}
                            />
                            <button
                                type="submit"
                                className="px-[45px] py-[20px] border rounded-[8px] text-[16px] text-nowrap"
                            >
                                중복 확인
                            </button>
                        </div>
                    </section>
                    <section className="w-full flex flex-col items-center">
                        <UploadDropDown
                            arr={categoryArr}
                            dropDownLabel={'관심 직군'}
                            dropDownPlaceholoder={'관심 직군을 선택해주세요.'}
                            width={'w-full'}
                            height={'min-h-[64px]'}
                            labelText={'text-[20px] font-bold'}
                            labelFont={'text-[16px]'}
                            gap={'gap-[12px]'}
                            name={''}
                        />
                    </section>
                </form>
            </FormProvider>
        </main>
    );
};

export default MypageUserProfile;
