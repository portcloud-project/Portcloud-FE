'use client';

import Link from 'next/link';
import { useState } from 'react';
import Login from '../customComponents/Login';

const Header = () => {
    const navArr = ['프로젝트', '포트폴리오', '팀 구하기', '기록'];

    const [loginModal, setLoginModal] = useState<boolean>(false);

    return (
        <header className="top-0 left-0 w-full h-[60px] flex justify-center items-center text-[var(--color-gray-900)] font-semibold text-[16px] z-50 bg-white mb-[24px]">
            <div className="w-[1440px] h-full flex flex-row justify-between items-center">
                <Link href={'/'} className="w-[130px] h-[28px]">
                    logoImage
                </Link>

                <nav className="w-[286px] h-[36px] flex flex-row justify-between items-center xs-mobile:hidden tablet:flex">
                    {navArr.map((a, i) => (
                        <Link key={i} href={'/'} className="">
                            {a}
                        </Link>
                    ))}
                </nav>

                <div className="w-[130px] h-[24px] flex justify-end items-center">
                    <h3 className="cursor-pointer" onClick={() => setLoginModal(true)}>
                        로그인
                    </h3>
                    {loginModal && <Login setLoginModal={setLoginModal} />}
                </div>
            </div>
        </header>
    );
};

export default Header;
