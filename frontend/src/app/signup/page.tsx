'use client';

import { useState } from 'react';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { FaCheck } from 'react-icons/fa6';
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

interface FormValuesType {
    email: string;
    password: string;
}

const Signup = () => {
    const [pwVisible, setPwVisible] = useState<boolean>(false);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormValuesType>({
        mode: 'onBlur',
    });

    const password = watch('password', '');

    const rules = [
        { label: '8자 이상', valid: password.length >= 8 },
        { label: '16자 이하', valid: password.length <= 16 },
        { label: '특수문자 포함', valid: /[^A-Za-z0-9]/.test(password) },
        { label: '대문자 포함', valid: /[A-Z]/.test(password) },
    ];

    const onSignUpSubmit = async (data: FormValuesType) => {
        const { email, password } = data;

        try {
            const res = await axios.post('api/signup', {
                email,
                password,
            });

            console.log(res.data);
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
                            className="w-[398px] h-[44px] border border-[var(--color-gray-400)] rounded-[8px] py-[10px] px-[12px] focus:border-[var(--color-purple-500)] focus:outline-none transition duration-300 ease-in-out"
                            {...register('email', {
                                required: '이메일은 필수입니다',
                                pattern: {
                                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                                    message: '올바른 이메일 형식을 입력하세요',
                                },
                            })}
                        />
                        {errors.email && (
                            <p className="text-sm text-red-600">{errors.email.message}</p>
                        )}
                        <button className="px-[24px] py-[12px] rounded-[8px] text-white bg-[var(--color-purple-500)] whitespace-nowrap border border-[var(--color-purple-500)] transition duration-300 ease-in-out hover:bg-white hover:text-[var(--color-purple-500)] cursor-pointer w-[76px] h-[44px] flex justify-center items-center">
                            인증
                        </button>
                    </div>
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
                            className="w-full h-[44px] border border-[var(--color-gray-400)] rounded-[8px] py-[10px] px-[12px] focus:border-[var(--color-purple-500)] focus:outline-none transition duration-300 ease-in-out"
                            {...register('password', {
                                required: '비밀번호는 필수입니다',
                                minLength: { value: 8, message: '8자 이상 입력하세요' },
                                pattern: {
                                    value: /^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).+$/,
                                    message: '대문자와 특수문자를 포함하세요',
                                },
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

                    {/* password rules section */}
                    <div className="w-full h-[98px] p-[12px] rounded-[8px] bg-[var(--color-green-50)] flex flex-col justify-center items-start gap-[4px]">
                        {rules.map((a, i) => (
                            <div
                                key={i}
                                className="flex flex-row justify-center items-center gap-[6px]"
                            >
                                <FaCheck
                                    className={`w-[12px] h-[12px] ${
                                        a.valid
                                            ? 'text-[var(--color-green-600)]'
                                            : 'text-[var(--color-red-500)]'
                                    }`}
                                />
                                <h3
                                    className={`text-[14px] font-normal ${
                                        a.valid
                                            ? 'text-[var(--color-green-600)]'
                                            : 'text-[var(--color-red-500)]'
                                    }`}
                                >
                                    {a.label}
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>

                {/* name, birth section */}
                <div className="w-full flex flex-row justify-between items-center gap-[6px]">
                    <div className="w-[236px] flex flex-col justify-center items-start gap-[6px]">
                        <label
                            htmlFor=""
                            className="text-[14px] font-semibold text-[var(--color-gray-900)]"
                        >
                            이름 (필수)
                        </label>
                        <input
                            type="text"
                            id="name"
                            placeholder="이름"
                            className="w-full h-[44px] border border-[var(--color-gray-400)] rounded-[8px] py-[10px] px-[12px] focus:border-[var(--color-purple-500)] focus:outline-none transition duration-300 ease-in-out"
                            required
                        />
                    </div>
                    <div className="w-[236px] flex flex-col justify-center items-start gap-[6px]">
                        <label
                            htmlFor=""
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
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* nickname,number section */}
                <div className="w-full flex flex-row justify-between items-center gap-[6px]">
                    <div className="w-[236px] flex flex-col justify-center items-start gap-[6px]">
                        <label
                            htmlFor=""
                            className="text-[14px] font-semibold text-[var(--color-gray-900)]"
                        >
                            닉네임 (필수)
                        </label>
                        <input
                            type="text"
                            id="nickname"
                            placeholder="이름"
                            className="w-full h-[44px] border border-[var(--color-gray-400)] rounded-[8px] py-[10px] px-[12px] focus:border-[var(--color-purple-500)] focus:outline-none transition duration-300 ease-in-out"
                            required
                        />
                    </div>
                    <div className="w-[236px] flex flex-col justify-center items-start gap-[6px]">
                        <label
                            htmlFor=""
                            className="text-[14px] font-semibold text-[var(--color-gray-900)]"
                        >
                            관심직군 (필수)
                        </label>
                        <div className="relative w-full">
                            <input
                                type="text"
                                id="interest"
                                placeholder="관심직군"
                                className="w-full h-[44px] border border-[var(--color-gray-400)] rounded-[8px] py-[10px] px-[12px] focus:border-[var(--color-purple-500)] focus:outline-none transition duration-300 ease-in-out"
                                required
                            />

                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <FaAngleDown className="w-[15px] h-[15px] text-[var(--color-gray-400)] absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    {/* <DropdownMenuSeparator /> */}
                                    {/* <DropdownMenuLabel>라벨</DropdownMenuLabel> */}
                                    <DropdownMenuItem>FE</DropdownMenuItem>
                                    <DropdownMenuItem>BE</DropdownMenuItem>
                                    <DropdownMenuItem>PM</DropdownMenuItem>
                                    <DropdownMenuItem>Designer</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
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
