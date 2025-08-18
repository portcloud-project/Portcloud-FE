'use client';

import { useState } from 'react';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { FaCheck } from 'react-icons/fa6';
import { LuCalendarMinus2 } from 'react-icons/lu';
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

const Signup = () => {
    const rules = ['8자 이상 16자 이내', '특수문자 포함', '대문자 포함'];
    const [pwVisible, setPwVisible] = useState<boolean>(false);

    return (
        <main className="w-full px-[24px] flex flex-col justify-start items-center mx-auto laptop:max-w-[1440px] tablet:w-full gap-[24px]">
            <h3 className="font-bold text-[28px] text-black">회원가입</h3>
            <form
                action=""
                className="w-[480px] flex flex-col justify-start items-start gap-[22px]"
            >
                {/* email section */}
                <div className="w-full h-fit flex flex-col justify-center items-start gap-[6px]">
                    <label
                        htmlFor=""
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
                            required
                        />
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
                            required
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
                                <FaCheck className="w-[12px] h-[12px] text-[var(--color-gray-500)]" />
                                <h3 className="text-[14px] font-normal text-[var(--color-gray-500)]">
                                    {a}
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
                                type="text"
                                id="birth"
                                placeholder="생년월일"
                                className="w-full h-[44px] border border-[var(--color-gray-400)] rounded-[8px] py-[10px] px-[12px] focus:border-[var(--color-purple-500)] focus:outline-none transition duration-300 ease-in-out"
                                required
                            />
                            <LuCalendarMinus2 className="w-[24px] h-[24px] text-[var(--color-gray-400)] text-[2px] absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" />
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

                {/* phone number section */}
                <div className="w-full flex flex-row justify-between items-center gap-[6px]">
                    <div className="w-[130px] flex flex-col justify-center items-start gap-[6px]">
                        <label
                            htmlFor=""
                            className="text-[14px] font-semibold text-[var(--color-gray-900)]"
                        >
                            전화번호 (필수)
                        </label>
                        <input
                            type="text"
                            id="nickname"
                            placeholder="대한민국 +82"
                            className="w-full h-[44px] border border-[var(--color-gray-400)] rounded-[8px] py-[10px] px-[12px] focus:border-[var(--color-purple-500)] focus:outline-none transition duration-300 ease-in-out"
                            required
                        />
                    </div>
                    <div className="w-[342px] flex flex-col justify-center items-start gap-[6px]">
                        <label
                            htmlFor=""
                            className="text-[14px] font-semibold text-[var(--color-gray-900)]"
                        >
                            번호
                        </label>
                        <div className="relative w-full">
                            <input
                                type="text"
                                id="interest"
                                placeholder="휴대전화 번호"
                                className="w-full h-[44px] border border-[var(--color-gray-400)] rounded-[8px] py-[10px] px-[12px] focus:border-[var(--color-purple-500)] focus:outline-none transition duration-300 ease-in-out"
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="w-full flex flex-row justify-between items-center gap-[6px] text-[14px] text-[var(--color-gray-900)] font-normal">
                    <div className="flex flex-row justify-center items-center gap-[4px]">
                        <input type="radio" />
                        <h3>개인정보 제 3자 제공 동의 (필수)</h3>
                    </div>

                    <Link className="underline" href="/">
                        내용보기
                    </Link>
                </div>

                <button className="w-full h-[48px] rounded-[8px] text-white text-[16px] font-semibold leading-[24px] border border-[var(--color-purple-500)] bg-[var(--color-purple-500)] px-[24px] py-[12px] hover:text-[var(--color-purple-500)] hover:bg-white transition duration-300 ease-in-out cursor-pointer">
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
