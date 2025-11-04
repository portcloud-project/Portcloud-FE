// components/auth/EmailVerification.tsx
'use client';

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import axios from 'axios';
import { FaCheck } from 'react-icons/fa6';

interface Props {
    /** 상위에서 인증 완료 여부를 알고 싶다면 사용 */
    onVerified?: () => void;
    /** 이미 인증 완료된 상태로 보여줄 때 */
    verified?: boolean;
    setNext?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ResetEmailVerification = ({ onVerified, verified: verifiedProp = false, setNext }: Props) => {
    const {
        register,
        formState: { errors },
        getValues,
        setError,
        clearErrors,
    } = useFormContext<{
        email: string;
        verificationCode: string;
    }>();

    const [verifyStep, setVerifyStep] = useState<boolean>(false);
    const [verifying, setVerifying] = useState<boolean>(false);
    const [sending, setSending] = useState<boolean>(false);
    const [verified, setVerified] = useState<boolean>(verifiedProp);

    const sendVerification = async () => {
        const email = getValues('email');
        // 이메일 검증
        const emailOk = /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/.test(email);
        if (!emailOk) {
            setError('email', { type: 'manual', message: '올바른 이메일 형식을 입력하세요' });
            return;
        }
        clearErrors('email');

        try {
            setSending(true);
            const res = await axios.post('/api/reset-password-verification', { email });
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
        const code = getValues('verificationCode');

        if (!code || code.length !== 6) {
            setError('verificationCode', { type: 'manual', message: '인증번호는 6자리입니다' });
            return;
        }
        clearErrors('verificationCode');

        try {
            setVerifying(true);
            const res = await axios.post('/api/reset-vertifycation', {
                verificationCode: code,
            });
            if (res.status === 200) {
                setVerified(true);
                setNext?.(true);
                onVerified?.();
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

    return (
        <div className="w-full h-fit flex flex-col justify-center items-start gap-[6px]">
            <div className="text-[20px] mb-[20px]">
                {!verifyStep
                    ? '비밀번호 재설정을 위해 포트클라우드에 가입한 이메일을 입력해 주세요.'
                    : '입력하신 이메일 주소로 인증번호가 발송되었습니다. 인증번호 6자리를 입력해주세요.'}
            </div>
            {/* 이메일 */}
            <label
                htmlFor="email"
                className="text-[14px] font-semibold text-[var(--color-gray-900)]"
            >
                이메일 (필수)
            </label>

            <div className="w-full flex flex-row justify-between items-center gap-[6px]">
                <input
                    type="email"
                    id="email"
                    readOnly={verified}
                    placeholder="이메일"
                    className={`${verified ? 'w-full' : 'w-[398px]'} h-[44px] border border-[var(--color-gray-400)] rounded-[8px] py-[10px] px-[12px] focus:outline-none transition duration-300 ease-in-out ${
                        errors.email
                            ? 'focus:bg-[var(--color-red-50)] focus:border-[var(--color-red-500)]'
                            : 'focus:bg-[var(--color-green-50)] focus:border-[var(--color-green-600)]'
                    }`}
                    {...register('email', {
                        required: '이메일 주소를 입력해 주세요',
                        pattern: {
                            value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                            message: '올바른 이메일 형식을 입력하세요',
                        },
                    })}
                />

                {!verified && (
                    <button
                        type="button"
                        disabled={sending}
                        className="px-[24px] py-[12px] rounded-[8px] text-white bg-[var(--color-purple-500)] whitespace-nowrap border border-[var(--color-purple-500)] transition duration-300 ease-in-out hover:bg-white hover:text-[var(--color-purple-500)] cursor-pointer w-[76px] h-[44px] flex justify-center items-center"
                        onClick={sendVerification}
                    >
                        {sending ? '전송중' : '인증번호'}
                    </button>
                )}
            </div>

            {errors.email && (
                <p className="text-sm text-[var(--color-red-500)]">{errors.email.message}</p>
            )}

            {/* 인증번호 입력 */}
            {(verifyStep || verified) && (
                <div className="w-full h-fit flex flex-col justify-center items-start gap-[6px] mt-2">
                    <label
                        htmlFor="email-verify"
                        className="text-[14px] font-semibold text-[var(--color-gray-900)]"
                    >
                        인증번호 입력
                    </label>

                    <div className="w-full flex flex-row justify-between items-center gap-[6px]">
                        <input
                            readOnly={verified}
                            type="text"
                            id="email-verify"
                            placeholder="6자리 인증번호"
                            className={`w-[398px] h-[44px] border border-[var(--color-gray-400)] rounded-[8px] py-[10px] px-[12px] focus:outline-none transition duration-300 ease-in-out ${
                                errors.verificationCode
                                    ? 'focus:bg-[var(--color-red-50)] focus:border-[var(--color-red-500)]'
                                    : 'focus:bg-[var(--color-green-50)] focus:border-[var(--color-green-600)]'
                            }`}
                            {...register('verificationCode', {
                                required: '인증번호를 입력해주세요',
                                minLength: { value: 6, message: '인증번호는 6자리 입니다.' },
                                maxLength: { value: 6, message: '인증번호는 6자리 입니다.' },
                            })}
                        />

                        {!verified ? (
                            <button
                                type="button"
                                disabled={verifying}
                                className="px-[24px] py-[12px] rounded-[8px] text-white bg-[var(--color-purple-500)] whitespace-nowrap border border-[var(--color-purple-500)] transition duration-300 ease-in-out hover:bg-white hover:text-[var(--color-purple-500)] cursor-pointer w-[76px] h-[44px] flex justify-center items-center"
                                onClick={verifyEmail}
                            >
                                {verifying ? '확인중' : '인증'}
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="px-[24px] py-[12px] rounded-[8px] text-[var(--color-gray-300)] bg-white whitespace-nowrap border border-[var(--color-gray-300)] w-[76px] h-[44px] flex justify-center items-center"
                                disabled
                            >
                                <FaCheck className="mr-1" />
                                인증 완료
                            </button>
                        )}
                    </div>

                    {errors.verificationCode && (
                        <p className="text-sm text-[var(--color-red-500)]">
                            {errors.verificationCode.message}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default ResetEmailVerification;
