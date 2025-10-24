'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MypageAdd from '../customComponents/MypageAdd';
import { userStore } from '../stores/userStore';
import MyPagePortfolio from '../customComponents/MypagePortfolio';
import MypageUserProfile from '../customComponents/MypageUserProfile';
import { FormProvider, useForm } from 'react-hook-form';
import { useState } from 'react';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { FaCheck } from 'react-icons/fa6';
import axios from 'axios';
import Image from 'next/image';
import MypageProject from '../customComponents/MypageProject';
import MypageTeam from '../customComponents/MypageTeam';
import { useQueryClient } from '@tanstack/react-query';
import MypageBookMark from '../customComponents/MypageBookMark';
import Cookies from 'js-cookie';
import MyActivityLike from '../customComponents/MyActivityLike';

interface NewPasswordFormValuesType {
    password: string;
    newPassword: string;
    newPasswordConfirm: string;
}

interface WithDrawFormValuesType {
    isAgreedWithDraw: boolean;
    email: string;
    password: string;
    emailVerify: string;
    verificationCode: string;
}

const Mypage = () => {
    const [pwVisible, setPwVisible] = useState(false);
    const [verifyStep, setVerifyStep] = useState<boolean>(false);
    const [verifying, setVerifying] = useState<boolean>(false);
    const [sending, setSending] = useState<boolean>(false);
    const [verified, setVerified] = useState<boolean>(false);
    const queryclient = useQueryClient();

    const methods = useForm<NewPasswordFormValuesType>({
        mode: 'all',
        reValidateMode: 'onChange',
        defaultValues: {
            password: '',
            newPassword: '',
            newPasswordConfirm: '',
        },
    });

    const methods2 = useForm<WithDrawFormValuesType>({
        mode: 'all',
        reValidateMode: 'onChange',
        defaultValues: {
            isAgreedWithDraw: false,
            email: '',
            password: '',
            emailVerify: '',
            verificationCode: '',
        },
    });

    const {
        register,
        // handleSubmit,
        watch,
        getValues,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = methods;

    const {
        register: registerWd,
        getValues: getValuesWd,
        handleSubmit: handleSubmitWd,
        formState: { errors: errorsWd, isSubmitting: isSubmittingWd },
    } = methods2;

    const password = watch('password', '');

    const rules = [
        { label: '8자 이상 16자 이내', valid: password.length >= 8 && password.length <= 16 },
        { label: '특수문자 포함', valid: /[^A-Za-z0-9]/.test(password) },
        { label: '대문자 포함', valid: /[A-Z]/.test(password) },
    ];

    const tabsArr = [
        { value: 'bookMarks', title: '북마크 관리' },
        {
            value: 'portfolios',
            title: '포트폴리오 관리',
        },
        { value: 'projects', title: '프로젝트 관리' },
        { value: 'teams', title: '팀 관리' },
        { value: 'myActivity', title: '내 활동' },
        { value: 'settings', title: '설정' },
    ];
    const innerTapsActivityArr = [
        {
            value: 'like',
            title: '좋아요',
        },
        {
            value: 'comment',
            title: '댓글',
        },
    ];
    const user = userStore((state) => state.user);
    const logout = () => {
        Cookies.remove('accessToken');
        queryclient.setQueryData(['user'], null);
        queryclient.invalidateQueries();
        userStore.getState().clearUser();
    };

    const onWithDrawSubmit = async (data: WithDrawFormValuesType) => {
        const code = getValuesWd('emailVerify');
        const { password } = data;

        try {
            const res = await axios.delete('/api/withdraw', {
                data: { verificationCode: code, password },
            });

            if (res.status === 200) {
                queryclient.invalidateQueries();
                logout();
            } else {
                console.error('오류발생');
            }
        } catch (err) {
            console.error(err);
        }
    };

    const sendWithDrawVerificationCode = async () => {
        const email = getValuesWd('email');
        try {
            setSending(true);
            const res = await axios.post('/api/sendwithdrawverification', { email });
            alert(res.data?.message ?? '인증번호가 전송되었습니다');
            setVerifyStep(true);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            alert(err?.response?.data?.message ?? '이미 가입된 이메일이거나 전송 실패');
        } finally {
            setSending(false);
        }
    };

    const verifyEmail = async () => {
        const email = getValuesWd('email');
        const code = getValuesWd('emailVerify');

        try {
            setVerifying(true);
            const res = await axios.post('/api/verifyemail', {
                email,
                verificationCode: code,
            });
            if (res.status === 200) {
                setVerified(true);
                alert('인증이 확인되었습니다');
            } else {
                throw new Error('인증 실패');
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            alert(err?.response?.data?.message ?? '인증 번호를 다시 확인해주세요');
        } finally {
            setVerifying(false);
        }
    };
    const handleChangePassword = async (data: NewPasswordFormValuesType) => {
        try {
            const payload = {
                currentPassword: data.password,
                newPassword: data.newPassword,
                newPasswordConfirm: data.newPasswordConfirm,
            };
            const response = await axios.patch('/api/change-password', payload);
            logout();
            reset();
            return response.data;
        } catch (err) {
            console.error(err);
            throw err;
        }
    };

    if (!user.name && !user.nickname && !user.sub) {
        return (
            <div className="flex justify-center items-center w-full h-screen">
                로그인 후에 이용가능한 기능입니다.
            </div>
        );
    }

    return (
        <main className="w-full px-[24px] flex flex-col justify-start items-center mx-auto laptop:max-w-[1440px] tablet:w-full gap-[48px]">
            <h3 className="font-bold text-[28px] text-black">마이 페이지</h3>
            <Tabs
                defaultValue="profile"
                className="w-[1392px] h-[764px] border border-[var(--color-gray-300)]"
            >
                <TabsList>
                    <div className="flex flex-col justify-center items-center gap-[24px] w-full h-[344px] py-[48px] border-b-[1px] border-[var(--color-gray-300)]">
                        {/* 프로필 사진 */}
                        <div className="relative w-[92px] h-[92px] rounded-full border border-black">
                            <Image
                                src={`https://port-cloud.com/img/${user.profileUrl}`}
                                alt="profile"
                                unoptimized
                                fill
                                className="object-cover rounded-full"
                            />
                        </div>
                        {/* 닉네임, 이메일 */}
                        <div className="flex flex-col justify-center items-center gap-[4px]">
                            <h3 className="text-balck text-[28px] font-bold">
                                {user.nickname ? user.nickname : 'PortCloud'}
                            </h3>
                            <h3 className="text-[var(--color-gray-500)] font-semibold text-[16px]">
                                {user.sub ? user.sub : '로그인이 필요합니다'}
                            </h3>
                        </div>
                        <TabsTrigger
                            value="profile"
                            className="w-[121px] h-[40px] flex justify-center items-center text-[16px] font-semibold text-white bg-[var(--color-purple-500)] rounded-[20px]"
                        >
                            프로필 수정
                        </TabsTrigger>
                    </div>
                    <div className="p-[12px]">
                        {tabsArr.map((a, i) => {
                            return (
                                <TabsTrigger key={i} value={a.value}>
                                    {a.title}
                                </TabsTrigger>
                            );
                        })}
                    </div>
                </TabsList>

                <TabsContent value="profile" className="p-[20px]">
                    <MypageUserProfile />
                </TabsContent>
                <TabsContent value="bookMarks" className="overflow-y-auto p-[20px]">
                    <MypageBookMark />
                </TabsContent>
                <TabsContent value="portfolios" className="overflow-y-auto p-[20px]">
                    <MyPagePortfolio />
                </TabsContent>
                <TabsContent value="projects">
                    <MypageProject />
                    <MypageAdd title="프로젝트 업로드" route="/upload/projects" />
                </TabsContent>
                <TabsContent value="teams">
                    <MypageTeam />
                    <MypageAdd title="팀 구하기 업로드" route="/upload/teams" />
                </TabsContent>
                <TabsContent value="myActivity" className="p-[20px]">
                    <Tabs defaultValue="like" className="flex flex-col gap-[12px]">
                        <TabsList className="flex w-full flex-row shadow-none border-none">
                            {innerTapsActivityArr.map((a, i) => {
                                return (
                                    <TabsTrigger
                                        key={i}
                                        value={a.value}
                                        className="flex w-[50%] justify-center border-b-2 border-t-0 border-r-0 shadow-none  data-[state=active]:border-purple-500"
                                    >
                                        {a.title}
                                    </TabsTrigger>
                                );
                            })}
                        </TabsList>
                        <TabsContent value="like" className="flex justify-start">
                            <MyActivityLike />
                        </TabsContent>
                    </Tabs>
                </TabsContent>
                <TabsContent value="settings" className="overflow-y-auto p-[32px]">
                    <div className="flex flex-col justify-start items-start gap-[32px]">
                        <h3 className="font-bold text-[24px] text-[var(--color-gray-900)]">설정</h3>
                        {/* 비밀변호 변경 section */}
                        <FormProvider {...methods}>
                            <form
                                className="flex flex-col gap-[12px] w-[1001px] h-auto"
                                onSubmit={handleSubmit(handleChangePassword)}
                            >
                                <h3 className="font-bold text-[20px] text-[var(--color-gray-900)]">
                                    비밀번호 수정
                                </h3>
                                {/* 현재 비밀번호 section */}
                                <div className="w-full relative">
                                    <input
                                        type={pwVisible ? 'text' : 'password'}
                                        placeholder="현재 비밀번호"
                                        maxLength={16}
                                        className={`w-full h-[64px] border border-[var(--color-gray-400)] rounded-[8px] py-[10px] px-[12px]  focus:outline-none transition duration-300 ease-in-out
                                                ${
                                                    rules.every((a) => a.valid)
                                                        ? 'focus:bg-[var(--color-green-50)] focus:border-[var(--color-green-600)]'
                                                        : 'focus:bg-[var(--color-red-50)] focus:border-[var(--color-red-500)]'
                                                }`}
                                        {...register('password', {
                                            required: '비밀번호 조건에 맞게 입력해 주세요',
                                            minLength: 8,
                                            maxLength: 16,
                                            pattern: /^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).+$/,
                                        })}
                                    />
                                    {pwVisible ? (
                                        <AiOutlineEye
                                            className="w-[24px] h-[24px] absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-[var(--color-gray-400)]"
                                            onClick={() => setPwVisible(false)}
                                        />
                                    ) : (
                                        <AiOutlineEyeInvisible
                                            className="w-[24px] h-[24px] absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-[var(--color-gray-400)]"
                                            onClick={() => setPwVisible(true)}
                                        />
                                    )}
                                </div>

                                {/* 현재 비밀번호 error section */}
                                {errors.password && (
                                    <p className="text-sm text-[var(--color-red-500)]">
                                        {errors.password.message}
                                    </p>
                                )}

                                <div className="w-full relative">
                                    <input
                                        type={pwVisible ? 'text' : 'password'}
                                        placeholder="새 비밀번호"
                                        maxLength={16}
                                        className={`w-full h-[64px] border border-[var(--color-gray-400)] rounded-[8px] py-[10px] px-[12px]  focus:outline-none transition duration-300 ease-in-out
                                                ${
                                                    rules.every((a) => a.valid)
                                                        ? 'focus:bg-[var(--color-green-50)] focus:border-[var(--color-green-600)]'
                                                        : 'focus:bg-[var(--color-red-50)] focus:border-[var(--color-red-500)]'
                                                }`}
                                        {...register('newPassword', {
                                            required: '비밀번호 조건에 맞게 입력해 주세요',
                                            minLength: 8,
                                            maxLength: 16,
                                            pattern: /^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).+$/,
                                        })}
                                    />
                                    {pwVisible ? (
                                        <AiOutlineEye
                                            className="w-[24px] h-[24px] absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-[var(--color-gray-400)]"
                                            onClick={() => setPwVisible(false)}
                                        />
                                    ) : (
                                        <AiOutlineEyeInvisible
                                            className="w-[24px] h-[24px] absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-[var(--color-gray-400)]"
                                            onClick={() => setPwVisible(true)}
                                        />
                                    )}
                                </div>

                                {/* new password error section */}
                                {errors.newPassword && (
                                    <p className="text-sm text-[var(--color-red-500)]">
                                        {errors.newPassword.message}
                                    </p>
                                )}

                                {/* new password rules section */}
                                <div
                                    className={`w-full h-[98px] p-[12px] rounded-[8px] bg-[var(--color-green-50)] flex flex-col justify-center items-start gap-[4px] ${
                                        rules.every((a) => a.valid)
                                            ? 'bg-[var(--color-green-50)]'
                                            : 'bg-[var(--color-red-50)]'
                                    }`}
                                >
                                    {rules.map((a, i) => (
                                        <div
                                            key={i}
                                            className={`flex flex-row justify-center items-center gap-[6px]  ${
                                                a.valid
                                                    ? 'text-[var(--color-green-600)]'
                                                    : 'text-[var(--color-red-500)]'
                                            }`}
                                        >
                                            <FaCheck className={`w-[12px] h-[12px]`} />
                                            <h3 className={`text-[14px] font-normal`}>{a.label}</h3>
                                        </div>
                                    ))}
                                </div>

                                {/*new password confirm section */}
                                <div className="w-full h-fit flex flex-col justify-center items-start gap-[6px]">
                                    <div className="relative w-full">
                                        <input
                                            id="new-password-confirm"
                                            type="password"
                                            placeholder="새 비밀번호 확인"
                                            maxLength={16}
                                            className={`w-full h-[64px] border border-[var(--color-gray-400)] rounded-[8px] py-[10px] px-[12px]  focus:outline-none transition duration-300 ease-in-out
                                            ${
                                                errors.newPasswordConfirm
                                                    ? 'focus:bg-[var(--color-red-50)] focus:border-[var(--color-red-500)]'
                                                    : 'focus:bg-[var(--color-green-50)] focus:border-[var(--color-green-600)]'
                                            }
                                            `}
                                            {...register('newPasswordConfirm', {
                                                required: '비밀번호가 일치해야 합니다',
                                                validate: (value) =>
                                                    value === getValues('newPassword') ||
                                                    '비밀번호가 일치하지 않습니다',
                                            })}
                                        />
                                    </div>
                                    {/* 비밀번호 error section */}
                                    {errors.newPasswordConfirm && (
                                        <p className="text-sm text-[var(--color-red-500)]">
                                            {errors.newPasswordConfirm.message}
                                        </p>
                                    )}
                                </div>
                                <button
                                    className="self-end w-[164px] h-[64px] rounded-[8px] text-white text-[16px] font-semibold leading-[24px] border border-[var(--color-purple-500)] bg-[var(--color-purple-500)] px-[24px] py-[12px] hover:text-[var(--color-purple-500)] hover:bg-white transition duration-300 ease-in-out cursor-pointer"
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    비밀번호 변경하기
                                </button>
                            </form>
                        </FormProvider>

                        {/* 회원탈퇴 section */}
                        <h3 className="font-bold text-[24px] text-[var(--color-gray-900)]">설정</h3>
                        {/* 비밀변호 변경 section */}
                        <FormProvider {...methods2}>
                            <form
                                className="flex flex-col gap-[20px] w-[1001px] h-auto justify-start items-start"
                                onSubmit={handleSubmitWd(onWithDrawSubmit)}
                            >
                                <h3 className="font-bold text-[20px] text-[var(--color-gray-900)]">
                                    회원 탈퇴
                                </h3>
                                <div className="w-full h-auto flex flex-col justify-start items-start gap-[12px]">
                                    <h4 className="font-semibold text-[16px] text-[var(--color-gray-900)]">
                                        PortCloud 계정을 삭제하시겠습니까?
                                    </h4>
                                    <p className="font-normal text-[16px] text-[var(--color-gray-700)]">
                                        PortCloud를 탈퇴하게 되면 계정 정보 및 모든 콘텐츠 및
                                        데이터가 삭제됩니다. 탈퇴한 후에는 더 이상 해당 계정으로
                                        로그인할 수 없으며, 모든 세부 서비스들도 이용할 수 없습니다.
                                        탈퇴 후 3개월 내 동일 이메일로 재가입이 불가합니다. 탈퇴한
                                        PortCloud 계정 정보와 서비스 이용 기록 등은 복구할 수 없으니
                                        신중하게 선택하시길 바랍니다.
                                    </p>
                                    <div className="self-start w-fit h-auto flex justify-center items-center gap-[4px]">
                                        <input
                                            type="checkbox"
                                            id="isAgreedWithDraw"
                                            {...registerWd('isAgreedWithDraw', {
                                                required: {
                                                    value: true,
                                                    message: '유의사항을 동의해주세요.',
                                                },
                                            })}
                                        />
                                        <label
                                            htmlFor="isAgreedWithDraw"
                                            className="font-semibold text-[16px] text-[var(--color-gray-700)]"
                                        >
                                            탈퇴 시 유의 사항을 확인하였습니다.
                                        </label>
                                    </div>
                                    {errorsWd.isAgreedWithDraw && (
                                        <p className="text-sm text-[var(--color-red-500)]">
                                            {errorsWd.isAgreedWithDraw.message}
                                        </p>
                                    )}
                                </div>
                                <hr className="w-full h-[1px] text-[var(--color-gray-300)]" />
                                <h3 className="font-bold text-[20px] text-[var(--color-gray-900)]">
                                    안전한 탈퇴를 위해 가입 계정 정보를 정확하게 입력해주세요.
                                </h3>
                                <div className="w-full flex gap-[12px] items-center justify-between">
                                    <input
                                        id="email"
                                        type="email"
                                        readOnly={verified}
                                        placeholder="Email"
                                        className={`w-full h-[64px] border border-[var(--color-gray-400)] rounded-[8px] py-[10px] px-[12px]  focus:outline-none transition duration-300 ease-in-out
                                    `}
                                        {...registerWd('email', {
                                            required: '이메일을 입력해주세요.',
                                        })}
                                    />
                                    {!verified && (
                                        <button
                                            type="button"
                                            disabled={sending}
                                            className="px-[24px] py-[12px] rounded-[8px] text-white bg-[var(--color-purple-500)] whitespace-nowrap border border-[var(--color-purple-500)] transition duration-300 ease-in-out hover:bg-white hover:text-[var(--color-purple-500)] cursor-pointer w-[76px] h-[64px] flex justify-center items-center"
                                            onClick={sendWithDrawVerificationCode}
                                        >
                                            {sending ? '전송중' : '인증번호'}
                                        </button>
                                    )}
                                </div>
                                {errorsWd.email && (
                                    <p className="text-sm text-[var(--color-red-500)]">
                                        {errorsWd.email.message}
                                    </p>
                                )}

                                {/* 인증번호 입력 */}
                                {(verifyStep || verified) && (
                                    <div className="w-full h-fit flex flex-col justify-center items-start gap-[6px] mt-2">
                                        <div className="w-full flex flex-row justify-between items-center gap-[12px]">
                                            <input
                                                readOnly={verified}
                                                type="text"
                                                id="email-verify"
                                                placeholder="6자리 인증번호"
                                                maxLength={6}
                                                minLength={6}
                                                className={`w-full h-[64px] border border-[var(--color-gray-400)] rounded-[8px] py-[10px] px-[12px] focus:outline-none transition duration-300 ease-in-out ${
                                                    errorsWd.emailVerify
                                                        ? 'focus:bg-[var(--color-red-50)] focus:border-[var(--color-red-500)]'
                                                        : 'focus:bg-[var(--color-green-50)] focus:border-[var(--color-green-600)]'
                                                }`}
                                                {...registerWd('emailVerify', {
                                                    required: '인증번호를 입력해주세요',
                                                    minLength: {
                                                        value: 6,
                                                        message: '인증번호는 6자리 입니다.',
                                                    },
                                                    maxLength: {
                                                        value: 6,
                                                        message: '인증번호는 6자리 입니다.',
                                                    },
                                                })}
                                            />

                                            {!verified ? (
                                                <button
                                                    type="button"
                                                    disabled={verifying}
                                                    className="px-[24px] py-[12px] rounded-[8px] text-white bg-[var(--color-purple-500)] whitespace-nowrap border border-[var(--color-purple-500)] transition duration-300 ease-in-out hover:bg-white hover:text-[var(--color-purple-500)] cursor-pointer w-[76px] h-[64px] flex justify-center items-center"
                                                    onClick={verifyEmail}
                                                >
                                                    {verifying ? '확인중' : '인증'}
                                                </button>
                                            ) : (
                                                <button
                                                    type="button"
                                                    className="px-[24px] py-[12px] rounded-[8px] text-[var(--color-gray-300)] bg-white whitespace-nowrap border border-[var(--color-gray-300)] w-[76px] h-[64px] flex justify-center items-center"
                                                    disabled
                                                >
                                                    인증 완료
                                                </button>
                                            )}
                                        </div>

                                        {errorsWd.emailVerify && (
                                            <p className="text-sm text-[var(--color-red-500)]">
                                                {errorsWd.emailVerify.message}
                                            </p>
                                        )}
                                    </div>
                                )}
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    maxLength={16}
                                    className={`w-full h-[64px] border border-[var(--color-gray-400)] rounded-[8px] py-[10px] px-[12px]  focus:outline-none transition duration-300 ease-in-out
                                    `}
                                    {...registerWd('password', {
                                        required: '비밀번호를 입력해주세요.',
                                    })}
                                />
                                <button
                                    className="self-end w-[164px] h-[64px] rounded-[8px] text-white text-[16px] font-semibold leading-[24px] border border-[var(--color-purple-500)] bg-[var(--color-purple-500)] px-[24px] py-[12px] hover:text-[var(--color-purple-500)] hover:bg-white transition duration-300 ease-in-out cursor-pointer"
                                    type="submit"
                                    disabled={isSubmittingWd}
                                >
                                    탈퇴하기
                                </button>
                            </form>
                        </FormProvider>
                    </div>
                </TabsContent>
            </Tabs>
        </main>
    );
};

export default Mypage;
