'use client';

import CardLayout from '../layoutComponents/CardLayout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FaGithub } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';
import { IoMdClose } from 'react-icons/io';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const Login = ({
    setLoginModal,
}: {
    setLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const [pwVisible, setPwVisible] = useState<boolean>(false);

    // 모달 true 일때 DOM 조작 (스크롤 막기 + 스크롤 바 없애기)
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = '0px';

        return () => {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        };
    }, []);

    return (
        <CardLayout setLoginModal={setLoginModal}>
            <Card
                className="w-[480px] h-[614px] p-[32px] flex flex-col justify-between items-center gap-[32px] relative"
                onMouseDown={(e) => e.stopPropagation()}
            >
                <h3 onClick={() => setLoginModal(false)} className="absolute top-8 right-8">
                    <IoMdClose className="w-[24px] h-[24px] cursor-pointer" />
                </h3>

                <CardHeader className="w-full h-[84px] flex flex-col justify-end items-center">
                    <CardTitle>로고</CardTitle>
                </CardHeader>

                <CardContent className="w-full h-auto p-0">
                    <form className="w-full flex flex-col gap-[24px] justify-center items-start font-normal text-[16px] text-[var(--color-gray-500)]">
                        {/* input section */}
                        <div className="flex  flex-col w-full gap-[16px]">
                            {/* email input section */}
                            <input
                                id="email"
                                type="email"
                                placeholder="Email"
                                required
                                className="w-full border border-[var(--color-gray-400)] rounded-[8px] py-[10px] px-[12px] focus:border-[var(--color-purple-500)] focus:outline-none transition duration-300 ease-in-out"
                            />

                            {/* password input section */}
                            <div className="w-full flex flex-col justify-center items-start gap-[6px]">
                                <div className="relative w-full">
                                    <input
                                        id="password"
                                        type={pwVisible ? 'text' : 'password'}
                                        placeholder="Password"
                                        className="w-full border border-[var(--color-gray-400)] rounded-[8px] py-[10px] px-[12px] focus:border-[var(--color-purple-500)] focus:outline-none transition duration-300 ease-in-out"
                                        required
                                    />
                                    {pwVisible ? (
                                        <AiOutlineEye
                                            className="w-[24px] h-[24px] absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                            onClick={() => setPwVisible(false)}
                                        />
                                    ) : (
                                        <AiOutlineEyeInvisible
                                            className="w-[24px] h-[24px] absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                            onClick={() => setPwVisible(true)}
                                        />
                                    )}
                                </div>
                                <a href="#" className="text-sm underline-offset-4 hover:underline">
                                    Forgot your password? &gt;
                                </a>
                            </div>
                        </div>

                        {/* buttons section */}
                        <button
                            type="submit"
                            className="w-full h-[48px] rounded-[8px] text-white text-[16px] font-semibold leading-[24px] border border-[var(--color-purple-500)] bg-[var(--color-purple-500)] px-[24px] py-[12px] hover:text-[var(--color-purple-500)] hover:bg-white transition duration-300 ease-in-out cursor-pointer"
                        >
                            Login
                        </button>

                        {/* divider section */}
                        <div className="w-full flex flex-row justify-center items-center gap-[12px]">
                            <hr className="flex-1 border border-[var(--color-gray-300)]" />
                            <span className="text-[var(--color-gray-500)] text-[14px] font-normal">
                                간편 로그인
                            </span>
                            <hr className="flex-1 border border-[var(--color-gray-300)]" />
                        </div>

                        <button className="w-full h-[48px] rounded-[8px] text-white text-[16px] font-semibold leading-[24px] border border-black bg-black px-[24px] py-[12px] hover:text-black hover:bg-white transition duration-300 ease-in-out flex flex-row justify-center items-center gap-[6px] cursor-pointer">
                            <FaGithub className="w-[24px] h-[24px]" /> Continue with GitHub
                        </button>
                        <button className="w-full h-[48px] rounded-[8px] text-black text-[16px] font-semibold leading-[24px] border border-[var(--color-gray-400)] bg-white px-[24px] py-[12px] flex flex-row justify-center items-center gap-[6px] hover:bg-[var(--color-gray-400)] transition duration-300 ease-in-out cursor-pointer">
                            <FcGoogle className="w-[24px] h-[24px]" />
                            Continue with Google
                        </button>
                    </form>
                </CardContent>

                <CardFooter className="w-full h-[20px] flex flex-row justify-center items-center gap-[16px]">
                    <h3 className="font-normal text-[14px] text-[var(--color-gray-500)]">
                        아직 회원이 아니라면?
                    </h3>
                    <Link
                        href="/signup"
                        className="underline font-normal text-[14px] text-[var(--color-gray-900)]"
                        onClick={() => setLoginModal(false)}
                    >
                        회원가입
                    </Link>
                </CardFooter>
            </Card>
        </CardLayout>
    );
};

export default Login;
