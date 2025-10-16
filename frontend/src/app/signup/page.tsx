'use client';

import { useState } from 'react';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { FaCheck } from 'react-icons/fa6';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import axios from 'axios';
import UploadDropDown from '../customComponents/UploadDropDown';
import EmailVerification from '../customComponents/Emailverification';
import PrivateAccept from '../customComponents/PrivateAccept';
import UseRule from '../customComponents/useRule';
import CustomAlert from '../customComponents/CustomAlert';

interface SignUpFormValuesType {
    email: string;
    password: string;
    passwordConfirm: string;
    name: string;
    birthDate: string;
    nickname: string;
    job: string;
    agreeTerms: boolean;
    verificationCode: string;
    emailVerify: string;
    useRule: boolean;
}

const Signup = () => {
    const [pwVisible, setPwVisible] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [isLoding, setIsLoading] = useState(false);
    const [privateModal, setPrivateModal] = useState<boolean>(false);
    const [useRuleModal, setUseRuleModal] = useState<boolean>(false);

    const methods = useForm<SignUpFormValuesType>({
        mode: 'all',
        reValidateMode: 'onChange',
        defaultValues: {
            email: '',
            emailVerify: '',
            password: '',
            passwordConfirm: '',
            name: '',
            birthDate: '',
            nickname: '',
            job: '',
            agreeTerms: false,
        },
    });

    const {
        register,
        handleSubmit,
        watch,
        getValues,
        control,
        formState: { errors, isSubmitting },
    } = methods;

    const password = watch('password', '');

    const rules = [
        { label: '8자 이상 16자 이내', valid: password.length >= 8 && password.length <= 16 },
        { label: '특수문자 포함', valid: /[^A-Za-z0-9]/.test(password) },
        { label: '대문자 포함', valid: /[A-Z]/.test(password) },
    ];

    const onSignUpSubmit = async (data: SignUpFormValuesType) => {
        setIsLoading(true);
        if (!isVerified) {
            alert('이메일 인증을 완료해 주세요');
            return;
        }

        try {
            const res = await axios.post('/api/signup', {
                email: data.email,
                password: data.password,
                name: data.name,
                nickname: data.nickname,
                birthDate: data.birthDate,
                job: data.job,
                agreeTerms: data.agreeTerms,
                verificationCode: data.emailVerify,
            });
            console.log(res.status);
            alert('회원가입 성공!');
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            alert('회원가입 실패');
            console.error('회원가입 에러내용:', err?.message ?? err);
        }
    };

    const isInterestArr = ['', 'PM', 'DESIGNER', 'FE', 'BE', 'QA'];

    return (
        <main className="w-full px-[24px] flex flex-col justify-start items-center mx-auto laptop:max-w-[1440px] tablet:w-full gap-[48px]">
            <h3 className="font-bold text-[28px] text-black">회원가입</h3>

            <FormProvider {...methods}>
                <form
                    autoComplete="off"
                    onSubmit={handleSubmit(onSignUpSubmit)}
                    className="w-[345px] tablet:w-[480px] flex flex-col justify-start items-start gap-[22px]"
                >
                    {/* email section */}
                    <EmailVerification
                        verified={isVerified}
                        onVerified={() => setIsVerified(true)}
                    />

                    {/* password section */}
                    <div className="w-full h-fit flex flex-col justify-center items-start gap-[6px]">
                        <label
                            htmlFor=""
                            className="text-[14px] font-semibold text-[var(--color-gray-900)]"
                        >
                            비밀번호 (필수)
                        </label>
                        <div className="relative w-full">
                            <input
                                id="password"
                                type={pwVisible ? 'text' : 'password'}
                                placeholder="비밀번호"
                                maxLength={16}
                                className={`w-full h-[44px] border border-[var(--color-gray-400)] rounded-[8px] py-[10px] px-[12px]  focus:outline-none transition duration-300 ease-in-out
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

                        {/* 비밀번호 error section */}
                        {errors.password && (
                            <p className="text-sm text-[var(--color-red-500)]">
                                {errors.password.message}
                            </p>
                        )}

                        {/* password rules section */}
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
                    </div>

                    {/* password section */}
                    <div className="w-full h-fit flex flex-col justify-center items-start gap-[6px]">
                        <label
                            htmlFor="password-confirm"
                            className="text-[14px] font-semibold text-[var(--color-gray-900)]"
                        >
                            비밀번호 확인(필수)
                        </label>
                        <div className="relative w-full">
                            <input
                                id="password-confirm"
                                type="password"
                                placeholder="비밀번호 확인"
                                maxLength={16}
                                className={`w-full h-[44px] border border-[var(--color-gray-400)] rounded-[8px] py-[10px] px-[12px]  focus:outline-none transition duration-300 ease-in-out
                                ${
                                    errors.passwordConfirm
                                        ? 'focus:bg-[var(--color-red-50)] focus:border-[var(--color-red-500)]'
                                        : 'focus:bg-[var(--color-green-50)] focus:border-[var(--color-green-600)]'
                                }
                                `}
                                {...register('passwordConfirm', {
                                    required: '비밀번호가 일치해야 합니다',
                                    validate: (value) =>
                                        value === getValues('password') ||
                                        '비밀번호가 일치하지 않습니다',
                                })}
                            />
                        </div>
                        {/* 비밀번호 error section */}
                        {errors.passwordConfirm && (
                            <p className="text-sm text-[var(--color-red-500)]">
                                {errors.passwordConfirm.message}
                            </p>
                        )}
                    </div>

                    {/* name, birth section */}
                    <div className="w-full flex flex-row justify-between items-center gap-[6px]">
                        {/* 이름 section */}
                        <div className="w-[236px] flex flex-col justify-center items-start gap-[6px] relative">
                            <label
                                htmlFor="name"
                                className="text-[14px] font-semibold text-[var(--color-gray-900)]"
                            >
                                이름 (필수)
                            </label>
                            <input
                                type="text"
                                id="name"
                                placeholder="이름"
                                className={`w-full h-[44px] border border-[var(--color-gray-400)] rounded-[8px] py-[10px] px-[12px] focus:outline-none transition duration-300 ease-in-out ${
                                    errors.name
                                        ? 'focus:bg-[var(--color-red-50)] focus:border-[var(--color-red-500)]'
                                        : 'focus:bg-[var(--color-green-50)] focus:border-[var(--color-green-600)]'
                                }`}
                                {...register('name', {
                                    required: '이름을 입력해 주세요',
                                    minLength: {
                                        value: 1,
                                        message: '이름은 1자 이상 입력해주세요',
                                    },
                                })}
                            />
                            {/* 이름 error section */}
                            {errors.name && (
                                <p className="text-sm text-[var(--color-red-500)] absolute left-0 top-[73px]">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>
                        {/* 생년월일 section */}
                        <div className="w-[236px] flex flex-col justify-center items-start gap-[6px] relative">
                            <label
                                htmlFor="birth"
                                className="text-[14px] font-semibold text-[var(--color-gray-900)]"
                            >
                                생년월일 (필수)
                            </label>
                            <div className="relative w-full">
                                <input
                                    type="date"
                                    id="birthDate"
                                    placeholder="생년월일"
                                    className="w-full h-[44px] border border-[var(--color-gray-400)] rounded-[8px] py-[10px] px-[12px] focus:border-[var(--color-purple-500)] focus:outline-none transition duration-300 ease-in-out"
                                    min="1900-01-01"
                                    max={`${new Date().getFullYear()}-${new Date().getMonth}-${new Date().getDate()}`}
                                    {...register('birthDate', {})}
                                />
                            </div>
                            {errors.birthDate && (
                                <p className="text-sm text-[var(--color-red-500)] absolute left-0 top-[73px]">
                                    {errors.birthDate.message}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* nickname, interest section */}
                    <div className="w-full flex flex-row justify-between items-center gap-[6px]">
                        {/* 닉네임 section */}
                        <div className="w-[236px] flex flex-col justify-center items-start gap-[6px] relative">
                            <label
                                htmlFor="nickname"
                                className="text-[14px] font-semibold text-[var(--color-gray-900)]"
                            >
                                닉네임 (필수)
                            </label>
                            <input
                                type="text"
                                id="nickname"
                                placeholder="닉네임"
                                className={`w-full h-[44px] border border-[var(--color-gray-400)] rounded-[8px]  px-[12px] focus:outline-none transition duration-300 ease-in-out ${
                                    errors.nickname
                                        ? 'focus:bg-[var(--color-red-50)] focus:border-[var(--color-red-500)]'
                                        : 'focus:bg-[var(--color-green-50)] focus:border-[var(--color-green-600)]'
                                }`}
                                {...register('nickname', {
                                    required: '닉네임을 입력해 주세요',
                                    minLength: {
                                        value: 3,
                                        message: '닉네임은 3자 이상 입력해주세요',
                                    },
                                })}
                            />
                            {/* 닉네임 error section */}
                            {errors.nickname && (
                                <p className="text-sm text-[var(--color-red-500)] left-0 ">
                                    {errors.nickname.message}
                                </p>
                            )}
                        </div>
                        {/* 관심직군 section */}
                        <Controller
                            name="job"
                            control={control}
                            rules={{ required: '관심 직군을 선택해 주세요' }}
                            render={({ field }) => (
                                <div className="relative">
                                    <UploadDropDown
                                        arr={isInterestArr}
                                        dropDownLabel="관심직군 (필수)"
                                        dropDownPlaceholoder="관심 직군"
                                        width="w-[236px]"
                                        height="h-[44px]"
                                        gap="gap-[6px]"
                                        labelFont="font-semibold"
                                        labelText="text-[14px]"
                                        value={field.value}
                                        onChange={field.onChange}
                                        name="job"
                                    />
                                </div>
                            )}
                        />
                    </div>

                    {/* 개인정보 section */}
                    <div className="w-full flex flex-row justify-between items-center gap-[6px] text-[14px] text-[var(--color-gray-900)] font-normal relative">
                        <div className="flex flex-row justify-center items-center gap-[4px]">
                            <input
                                type="checkbox"
                                id="personal-information-check"
                                {...register('agreeTerms', {
                                    required: {
                                        value: true,
                                        message: '개인정보 동의를 체크해주세요',
                                    },
                                })}
                            />
                            <label htmlFor="personal-information-check">
                                개인정보 제 3자 제공 동의 (필수)
                            </label>
                        </div>

                        {/* 여기 내용 모달로 */}
                        <div className="underline" onClick={() => setPrivateModal(true)}>
                            내용보기
                            {privateModal && <PrivateAccept setPrivateModal={setPrivateModal} />}
                        </div>
                        {/* 개인정보 체크 error section */}
                        {errors.agreeTerms && (
                            <p className="text-sm text-[var(--color-red-500)] absolute left-0 top-[18px]">
                                {errors.agreeTerms.message}
                            </p>
                        )}
                    </div>
                    {/* 이용약관 section */}
                    <div className="w-full flex flex-row justify-between items-center gap-[6px] text-[14px] text-[var(--color-gray-900)] font-normal relative">
                        <div className="flex flex-row justify-center items-center gap-[4px]">
                            <input
                                type="checkbox"
                                id="useRule-check"
                                {...register('useRule', {
                                    required: {
                                        value: true,
                                        message: '이용약관을 동의해주세요.',
                                    },
                                })}
                            />
                            <label htmlFor="useRule-check">이용약관 동의 (필수)</label>
                        </div>

                        {/* 여기 내용 모달로 */}
                        <div className="underline" onClick={() => setUseRuleModal(true)}>
                            내용보기
                            {useRuleModal && <UseRule setUseRuleModal={setUseRuleModal} />}
                        </div>
                        {/* 개인정보 체크 error section */}
                        {errors.useRule && (
                            <p className="text-sm text-[var(--color-red-500)] absolute left-0 top-[18px]">
                                {errors.useRule.message}
                            </p>
                        )}
                    </div>

                    <button
                        className="w-full h-[48px] rounded-[8px] text-white text-[16px] font-semibold leading-[24px] border border-[var(--color-purple-500)] bg-[var(--color-purple-500)] px-[24px] py-[12px] hover:text-[var(--color-purple-500)] hover:bg-white transition duration-300 ease-in-out cursor-pointer"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        동의하고 가입하기
                    </button>
                </form>
            </FormProvider>

            <h3 className="text-[14px] text-[var(--color-gray-900)] font-normal">
                만 14세 이상이며, PortCloud 이용약관, 개인 정보 수집 안내를 확인하고, 동의합니다.
            </h3>
            {isLoding && (
                <CustomAlert
                    isLoading={isLoding}
                    title="회원가입 중.."
                    message="잠시 시간이 소요될 수 있습니다."
                />
            )}
        </main>
    );
};

export default Signup;
