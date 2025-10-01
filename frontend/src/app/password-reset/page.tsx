'use client';

import { useState } from 'react';
import EmailVerification from '../customComponents/Emailverification';
import { FormProvider, useForm } from 'react-hook-form';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { FaCheck } from 'react-icons/fa6';

interface PasswordResetValuesType {
    email: string;
    password: string;
    passwordConfirm: string;
}

const PasswordReset = () => {
    const [pwVisible, setPwVisible] = useState<boolean>(false);
    const [isVerified, setIsVerified] = useState<boolean>(false);
    const [next, setNext] = useState<boolean>(false);

    const methods = useForm<PasswordResetValuesType>({
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues: {
            email: '',
            password: '',
            passwordConfirm: '',
        },
    });

    const {
        register,
        // handleSubmit,
        watch,
        getValues,
        // control,
        formState: {
            errors,
            // isSubmitting
        },
    } = methods;

    const password = watch('password', '');

    const rules = [
        { label: '8자 이상 16자 이내', valid: password.length >= 8 && password.length <= 16 },
        { label: '특수문자 포함', valid: /[^A-Za-z0-9]/.test(password) },
        { label: '대문자 포함', valid: /[A-Z]/.test(password) },
    ];
    return (
        <main className="w-[480px] h-auto px-[24px] flex flex-col justify-start items-start gap-[24px] font-bold text-black">
            <h3 className="text-[28px]">비밀번호 재설정</h3>
            <p className="text-[20px]">
                비밀번호 재설정을 위해 포트클라우드에 가입한 이메일을 입력해 주세요.
            </p>
            <FormProvider {...methods}>
                <form>
                    {next ? (
                        <>
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
                        </>
                    ) : (
                        <EmailVerification
                            verified={isVerified}
                            onVerified={() => setIsVerified(true)}
                            setNext={setNext}
                        />
                    )}
                </form>
            </FormProvider>
        </main>
    );
};

export default PasswordReset;
