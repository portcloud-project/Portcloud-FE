'use client';

import Link from 'next/link';
import { useState } from 'react';
import Login from '../customComponents/Login';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { RxHamburgerMenu } from 'react-icons/rx';
import { usePathname } from 'next/navigation';
import useAuthStore from '../stores/useAuthStore';
import { useRouter } from 'next/navigation';

const Header = () => {
    const navArr = [
        { title: '프로젝트', link: '/works/projects' },
        { title: '포트폴리오', link: '/works/portfolios' },
        { title: '팀 구하기', link: '/works/teams' },
        { title: '기록', link: '/works/logs' },
    ];

    const [loginModal, setLoginModal] = useState<boolean>(false);

    const router = useRouter();

    const pathname = usePathname() || '/';

    const token = useAuthStore((state) => state.token);
    const logout = useAuthStore((state) => state.logout);

    const isActive = (href: string) => {
        if (href === '/') return pathname === '/';
        return pathname === href || pathname.startsWith(href + '/');
    };
    return (
        <header className="top-0 left-0 w-full h-auto flex justify-center items-center z-45 bg-white border-b border-[var(--color-gray-300)]">
            <div className="w-full h-[60px] mx-auto laptop:max-w-[1440px] tablet:w-full flex flex-row justify-between items-center text-[var(--color-gray-900)] font-semibold text-[16px] px-[24px] py-[12px]">
                <div className="flex items-center justify-center gap-[6px] h-[28px] w-fit">
                    {/* hamburger section */}
                    <Sheet>
                        <SheetTrigger
                            className="tablet:hidden flex items-center justify-center h-[24px] w-[24px] text-black cursor-pointer"
                            aria-label="메뉴 열기"
                        >
                            <RxHamburgerMenu className="w-full h-full" />
                        </SheetTrigger>
                        <SheetContent side="left" aria-label="사이드 메뉴">
                            <SheetHeader className="p-0 m-0">
                                <SheetTitle className="px-[24px] py-[12px] h-[60px] flex flex-row justify-between items-center">
                                    logoImage
                                </SheetTitle>
                                <SheetDescription className="flex flex-col justify-center items-start gap-[24px] px-[24px] py-[12px]">
                                    {navArr.map((a, i) => {
                                        const active = isActive(a.link);
                                        return (
                                            <Link
                                                key={i}
                                                href={a.link}
                                                className={`text-[16px] font-semibold  ${
                                                    active
                                                        ? 'text-purple-500'
                                                        : 'text-[var(--color-gray-900)]'
                                                }`}
                                            >
                                                {a.title}
                                            </Link>
                                        );
                                    })}
                                </SheetDescription>
                            </SheetHeader>
                            {/* TODO: 실제 내비 아이템 */}
                        </SheetContent>
                    </Sheet>

                    {/* logo section */}
                    <Link href="/" className="block h-[28px]" aria-label="홈으로 이동">
                        logoImage
                    </Link>
                </div>

                {/* nav section */}
                <nav className="w-[286px] h-[36px] flex flex-row justify-between items-center xs-mobile:hidden tablet:flex">
                    {navArr.map((a, i) => (
                        <Link
                            key={i}
                            href={a.link}
                            className="text-[16px] font-semibold text-[var(--color-gray-900)]"
                        >
                            {a.title}
                        </Link>
                    ))}
                </nav>

                {/* login section */}
                <div className="w-fit h-[24px] flex justify-end items-center gap-[12px]">
                    {token ? (
                        <>
                            <h3 className="cursor-pointer" onClick={() => router.push('/mypage')}>
                                마이페이지
                            </h3>
                            <h3
                                className="cursor-pointer"
                                onClick={() => {
                                    logout();
                                    setLoginModal(false);
                                }}
                            >
                                로그아웃
                            </h3>
                        </>
                    ) : (
                        <>
                            <h3 className="cursor-pointer" onClick={() => setLoginModal(true)}>
                                로그인
                            </h3>
                            {loginModal && <Login setLoginModal={setLoginModal} />}
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
