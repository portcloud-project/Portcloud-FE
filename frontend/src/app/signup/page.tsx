'use client';

import { useState } from 'react';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { FaAngleUp, FaCheck } from 'react-icons/fa6';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    // DropdownMenuLabel,
    // DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FaAngleDown } from 'react-icons/fa6';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import axios from 'axios';

interface SignUpFormValuesType {
    email: string;
    password: string;
    passwordConfirm: string;
    name: string;
    birth: Date;
    nickname: string;
    interest: string;
}

const Signup = () => {
    const isInterestArr = ['', 'PM', 'DESIGNER', 'FE', 'BE', 'QA'];
    const [pwVisible, setPwVisible] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [selected, setSelected] = useState<string>('');
    const {
        getValues,
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<SignUpFormValuesType>({
        mode: 'onChange',
        reValidateMode: 'onChange',
    });

    const password = watch('password', '');

    const rules = [
        { label: '8자 이상 16자 이내', valid: password.length >= 8 && password.length <= 16 },
        { label: '특수문자 포함', valid: /[^A-Za-z0-9]/.test(password) },
        { label: '대문자 포함', valid: /[A-Z]/.test(password) },
    ];

    const onSignUpSubmit = async (data: SignUpFormValuesType) => {
        const { email, password, name, nickname, birth } = data;

        try {
            const res = await axios.post('api/signup', {
                email,
                password,
                name,
                nickname,
                birth,
            });

            console.log(res.status);

            alert('회원가입 성공!');
        } catch (err) {
            alert('회원가입 실패');
            if (err instanceof Error) {
                console.log('회원가입 에러내용: ', err.message);
            } else {
                console.error('알 수 없는 에러:', err);
            }
        }
    };

    return (
        <main className="w-full px-[24px] flex flex-col justify-start items-center mx-auto laptop:max-w-[1440px] tablet:w-full gap-[48px]">
            <h3 className="font-bold text-[28px] text-black">회원가입</h3>
            <form
                autoComplete="off"
                onSubmit={handleSubmit(onSignUpSubmit)}
                className="w-[345px] tablet:w-[480px] flex flex-col justify-start items-start gap-[22px]"
            >
                {/* email section */}
                <div className="w-full h-fit flex flex-col justify-center items-start gap-[6px]">
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
                            placeholder="이메일"
                            className={`w-[398px] h-[44px] border border-[var(--color-gray-400)] rounded-[8px] py-[10px] px-[12px] focus:outline-none transition duration-300 ease-in-out ${
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
                        <button
                            className="px-[24px] py-[12px] rounded-[8px] text-white bg-[var(--color-purple-500)] whitespace-nowrap border border-[var(--color-purple-500)] transition duration-300 ease-in-out hover:bg-white hover:text-[var(--color-purple-500)] cursor-pointer w-[76px] h-[44px] flex justify-center items-center"
                            onClick={() => {
                                console.log(getValues('email'));
                            }}
                        >
                            인증
                        </button>
                    </div>

                    {/* 이메일 error section */}
                    {errors.email && (
                        <p className="text-sm text-[var(--color-red-500)]">
                            {errors.email.message}
                        </p>
                    )}
                </div>

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
                                id="birth"
                                placeholder="생년월일"
                                className="w-full h-[44px] border border-[var(--color-gray-400)] rounded-[8px] py-[10px] px-[12px] focus:border-[var(--color-purple-500)] focus:outline-none transition duration-300 ease-in-out"
                                min="1900-01-01"
                                max={`${new Date().getFullYear()}-${new Date().getMonth}-${new Date().getDate()}`}
                                {...register('birth', {
                                    // validate: (a) => {
                                    //     const year = Number(a.getFullYear);
                                    //     const current = new Date().getFullYear();
                                    //     if (!year) return '유효하지 않은 출생 연도입니다';
                                    //     return (
                                    //         (year < 1900 && year > current) ||
                                    //         '유효하지 않은 출생 연도입니다'
                                    //     );
                                    // },
                                    // Number(a.getFullYear) < 1800 ||
                                    // Number(a.getFullYear) > new Date().getFullYear()
                                    //     ? '유효하지 않은 출생 연도입니다'
                                    //     : true,
                                })}
                            />
                        </div>
                        {errors.birth && (
                            <p className="text-sm text-[var(--color-red-500)] absolute left-0 top-[73px]">
                                {errors.birth.message}
                            </p>
                        )}
                    </div>
                </div>

                {/* nickname,number section */}
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
                            className={`w-full h-[44px] border border-[var(--color-gray-400)] rounded-[8px] py-[10px] px-[12px] focus:outline-none transition duration-300 ease-in-out ${
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
                            <p className="text-sm text-[var(--color-red-500)] absolute left-0 top-[73px]">
                                {errors.nickname.message}
                            </p>
                        )}
                    </div>
                    <div className="w-[236px] flex flex-col justify-center items-start gap-[6px] relative">
                        <label
                            htmlFor="interest"
                            className="text-[14px] font-semibold text-[var(--color-gray-900)]"
                        >
                            관심직군 (필수)
                        </label>
                        <input
                            type="hidden"
                            id="interest"
                            value={selected}
                            {...register('interest', {
                                required: '관심 직군을 선택해 주세요',
                            })}
                        />
                        {/* 여기 input name에서 왜 오류 뜨지 */}
                        <DropdownMenu open={open} onOpenChange={setOpen}>
                            <DropdownMenuTrigger
                                className={`w-full h-[44px] border rounded-[8px] px-[12px] flex items-center justify-between cursor-pointer transition duration-300 ease-in-out
                          ${open ? 'border-[var(--color-purple-500)]' : 'border-[var(--color-gray-400)]'}`}
                            >
                                <span className="flex-1 text-left">
                                    {selected || (
                                        <span className="text-[var(--color-gray-600)] text-[16px]">
                                            관심 직군
                                        </span>
                                    )}
                                </span>
                                <span className="ml-2 flex-shrink-0">
                                    {open ? (
                                        <FaAngleUp className="w-[15px] h-[15px] text-[var(--color-gray-400)]" />
                                    ) : (
                                        <FaAngleDown className="w-[15px] h-[15px] text-[var(--color-gray-400)]" />
                                    )}
                                </span>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-[236px] flex flex-col gap-[4px] p-[6px]"
                                side="bottom"
                                align="start"
                                sideOffset={6}
                                alignOffset={0}
                            >
                                {isInterestArr.map((a, i) => (
                                    <DropdownMenuItem
                                        key={i}
                                        className="text-[16px] text-[var(--color-gray-700)] data-[highlighted]:text-white bg-[white] data-[highlighted]:bg-[var(--color-purple-500)] transition duration-300 ease-in-out w-[364px] h-[48px]"
                                        onSelect={() => {
                                            setSelected(a);
                                            setValue('interest', a, { shouldValidate: true });
                                        }}
                                    >
                                        <FaCheck className="text-white" />
                                        {a}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        {/* 관심직군 error section */}
                        {errors.interest && (
                            <p className="text-sm text-[var(--color-red-500)] absolute left-0 top-[73px]">
                                {errors.interest.message}
                            </p>
                        )}
                    </div>
                </div>

                {/* 개인정보 section */}
                <div className="w-full flex flex-row justify-between items-center gap-[6px] text-[14px] text-[var(--color-gray-900)] font-normal">
                    <div className="flex flex-row justify-center items-center gap-[4px]">
                        <input type="radio" />
                        <h3>개인정보 제 3자 제공 동의 (필수)</h3>
                    </div>

                    <Link className="underline" href="/">
                        내용보기
                    </Link>
                </div>

                <button
                    className="w-full h-[48px] rounded-[8px] text-white text-[16px] font-semibold leading-[24px] border border-[var(--color-purple-500)] bg-[var(--color-purple-500)] px-[24px] py-[12px] hover:text-[var(--color-purple-500)] hover:bg-white transition duration-300 ease-in-out cursor-pointer"
                    type="submit"
                >
                    동의하고 가입하기
                </button>
            </form>

            <h3 className="text-[14px] text-[var(--color-gray-900)] font-normal">
                만 14세 이상이며, PortCloud 이용약관, 개인 정보 수집 안내를 확인하고, 동의합니다.
            </h3>
        </main>
    );
};

export default Signup;
