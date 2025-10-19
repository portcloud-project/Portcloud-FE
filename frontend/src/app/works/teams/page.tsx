'use client';

import MainTeamList from '@/app/customComponents/MainTeamList';
import RecentTeam, { TeamItem } from '@/app/customComponents/RecentTeam';
import { useRecentTeam } from '@/app/hooks/useRecentTeam';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

// UI 라벨(Front-end 등)과 백엔드가 기대하는 코드(FRONTEND 등)가 다를 수 있으니, 명시적 매핑을 둬.

// 카테고리 타입(백엔드 enum에 맞춰 수정)
// type CategoryCode = '' | 'ALL' | 'FRONTEND' | 'BACKEND' | 'FULLSTACK' | 'PM' | 'DESIGN';

// UI 라벨 → 코드 매핑
// const CATEGORY_MAP: Record<string, CategoryCode> = {
//     ALL: '',
//     'Front-end': 'FRONTEND',
//     'Back-end': 'BACKEND',
//     'Full-stack': 'FULLSTACK',
//     PM: 'PM',
//     Design: 'DESIGN',
// };

// (선택) 코드 → 라벨 역매핑(필요시)
// const LABEL_BY_CODE: Record<CategoryCode, string> = {
//   '': 'ALL',
//   ALL: 'ALL',
//   FRONTEND: 'Front-end',
//   BACKEND: 'Back-end',
//   FULLSTACK: 'Full-stack',
//   PM: 'PM',
//   DESIGN: 'Design',
// };

export type SearchType = 'title' | 'nickname';

const UserTeams = () => {
    const positionArr = ['ALL', 'Front-end', 'Back-end', 'Full-stack', 'PM', 'Design'] as const; // as const 왜?
    // 백엔드 enum? -> 이게 뭐였지 강의에서 봤는데

    const search = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const searchTitle = (search.get('q') ?? '').toLowerCase();
    const searchType = (search.get('type') || 'title') as SearchType;
    const category = search.get('category') ?? '';

    // ③ URL에서 현재 category 읽기 (없으면 '')
    //   const categoryFromUrl = (search.get('category') ?? '') as CategoryCode;

    const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: false });
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useRecentTeam(category);

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    const allItems: TeamItem[] = data?.pages.flatMap((page) => page.content) ?? [];

    const filteredItems = allItems.filter((item) => {
        if (!searchTitle) return true;

        if (searchType === 'title') {
            return (item.title ?? '').toLowerCase().includes(searchTitle);
        }
        if (searchType === 'nickname') {
            return (item.writerName ?? '').toLowerCase().includes(searchTitle);
        }
        return true;
    });

    // 클릭 시 category를 lowercase로 바꿔 URL 쿼리 반영
    const handleClickCategory = (label: string) => {
        const next = new URLSearchParams(search.toString());
        const newCategory = label === 'ALL' ? '' : label.toLowerCase(); // 🔥 핵심
        if (newCategory === '') next.delete('category');
        else next.set('category', newCategory);

        router.replace(`${pathname}?${next.toString()}`);
    };

    return (
        <section className="flex gap-[48px] flex-col justify-center items-center px-[48px]">
            <MainTeamList title="추천 팀 프로젝트 구하기" />
            <div className="w-full grid grid-cols-3 grid-rows-2 border border-[var(--color-purple-500)] rounded-[20px] overflow-hidden">
                {positionArr.map((label, i) => {
                    const isActive =
                        (label === 'ALL' && category === '') || label.toLowerCase() === category;

                    return (
                        <button
                            key={i}
                            onClick={() => handleClickCategory(label)}
                            className={`w-[464px] h-[80px] flex font-bold text-[20px] border border-[var(--color-purple-500)] justify-center items-center transition duration-300 ease-in-out cursor-pointer ${
                                isActive
                                    ? 'bg-[var(--color-purple-500)] text-white'
                                    : 'bg-white text-black hover:bg-[var(--color-purple-500)] hover:text-white'
                            }`}
                        >
                            {label}
                        </button>
                    );
                })}
            </div>
            <RecentTeam teamItems={filteredItems} />
            <div ref={ref}>{isFetchingNextPage && <p>데이터를 받아오는 중....</p>}</div>
        </section>
    );
};

export default UserTeams;
