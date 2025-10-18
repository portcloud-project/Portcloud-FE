'use client';

import MainTeamList from '@/app/customComponents/MainTeamList';
import RecentTeam, { TeamItem } from '@/app/customComponents/RecentTeam';
import { useRecentTeam } from '@/app/hooks/useRecentTeam';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export type SearchType = 'title' | 'nickname';

const UserTeams = () => {
    const search = useSearchParams();
    const searchTitle = (search.get('q') ?? '').toLowerCase();
    const searchType = (search.get('type') || 'title') as SearchType;

    const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: false });
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useRecentTeam();

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

    return (
        <section className="flex gap-[48px] flex-col justify-center items-center px-[24px]">
            <MainTeamList title="추천 팀 프로젝트 구하기" />
            <RecentTeam teamItems={filteredItems} />
            <div ref={ref}>{isFetchingNextPage && <p>데이터를 받아오는 중....</p>}</div>
        </section>
    );
};

export default UserTeams;
