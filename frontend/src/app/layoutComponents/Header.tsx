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
import { useRouter } from 'next/navigation';
import logo from '../imgs/logoImage.svg';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { useQueryClient } from '@tanstack/react-query';
import { useUser } from '../hooks/useUser';
import { userStore } from '../stores/userStore';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LucideLogOut, LucideUser } from 'lucide-react';
const Header = () => {
    const navArr = [
        { title: '프로젝트', link: '/works/projects' },
        { title: '포트폴리오', link: '/works/portfolios' },
        { title: '팀 구하기', link: '/works/teams' },
        { title: '기록', link: '/works/logs' },
    ];

    const [loginModal, setLoginModal] = useState<boolean>(false);
    const queryClient = useQueryClient();
    const router = useRouter();
    const { data: isUser, isLoading } = useUser();
    const user = userStore((state) => state.user);

    const logout = () => {
        Cookies.remove('accessToken');
        queryClient.setQueryData(['user'], null);
        queryClient.invalidateQueries();
        userStore.getState().clearUser();
        setLoginModal(false);
    };
    const pathname = usePathname() || '/';
    const pathnameSplit = pathname.split('/')[2];
    const isActive = (activeLinkSplit: string) => {
        if (activeLinkSplit === '') {
            return pathnameSplit === undefined;
        }
        return pathnameSplit === activeLinkSplit;
    };

    if (isLoading) return null;
    console.log(user.profileUrl);

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
                                <SheetTitle className="px-[24px] py-[12px] h-[60px] flex flex-row justify-between items-center"></SheetTitle>
                                <SheetDescription className="flex flex-col justify-center items-start gap-[24px] px-[24px] py-[12px]">
                                    {navArr.map((a, i) => {
                                        const linkSplit = a.link.split('/')[2];
                                        const active = isActive(linkSplit);
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
                    <Link href="/" className="block h-[28px] w-auto" aria-label="홈으로 이동">
                        <Image src={logo} alt="logo" width={130} />
                    </Link>
                </div>

                {/* nav section */}
                <nav className="w-[286px] h-[36px] flex flex-row justify-between items-center xs-mobile:hidden tablet:flex">
                    {navArr.map((a, i) => {
                        const activeLinkSplit = a.link.split('/')[2];
                        const active = isActive(activeLinkSplit);
                        return (
                            <Link
                                key={i}
                                href={a.link}
                                className={`text-[16px] font-semibold  ${
                                    active ? 'text-purple-500' : 'text-[var(--color-gray-900)]'
                                }`}
                            >
                                {a.title}
                            </Link>
                        );
                    })}
                </nav>

                {/* login section */}
                <div className="w-fit h-[24px] flex justify-end items-center gap-[12px]">
                    {isUser ? (
                        <>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="cursor-pointer">
                                        <Avatar>
                                            <AvatarImage
                                                src={`https://port-cloud.com/img/${user.profileUrl}`}
                                            />
                                            <AvatarFallback>Img</AvatarFallback>
                                        </Avatar>
                                    </button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent className="w-56" align="end">
                                    <DropdownMenuLabel>
                                        Hello!
                                        <h3 className="text-lg">{user.nickname}</h3>
                                        <p className="text-sm text-[#adadad]">{user.name}</p>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem
                                            className="text-primary font-bold transition-all duration-300 ease-in-out text-lg bg-white px-1 rounded-lg border-2 border-white hover:bg-[#dadadabe] cursor-pointer"
                                            onClick={() => {
                                                logout();
                                                setLoginModal(false);
                                            }}
                                        >
                                            <LucideLogOut />
                                            로그아웃
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            className="text-primary font-bold transition-all duration-300 ease-in-out text-lg bg-white px-1 rounded-lg border-2 border-white hover:bg-[#dadadabe] cursor-pointer"
                                            onClick={() => router.push('/mypage')}
                                        >
                                            <LucideUser /> 마이페이지
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
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
