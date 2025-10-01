'use client';
import MainLogs from '@/app/customComponents/MainLogs';
import RecentLogs from '@/app/customComponents/RecentLogs';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { SearchType } from '../portfolios/page';
import { useRecentLogs } from '@/app/hooks/useRecentLogs';

const Logs = () => {
    const search = useSearchParams();
    const searchTitle = search.get('q')?.toLowerCase() || '';
    const searchType = (search.get('type') || 'title') as SearchType;

    const { ref, inView } = useInView({
        threshold: 0.5,
        triggerOnce: false,
    });
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useRecentLogs();

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    const allItems = data?.pages.flatMap((page) => page.data.content) ?? [];
    const filteredItems = allItems.filter((item) => {
        if (!searchTitle) return true;

        if (searchType === 'title') return item.title.toLowerCase().includes(searchTitle);
        if (searchType === 'nickname') return item.writeName.toLowerCase().includes(searchTitle);
    });
    return (
        <main className="w-full px-[24px] flex flex-col justify-start items-center mx-auto laptop:max-w-[1440px] tablet:w-full gap-[48px]">
            <MainLogs title="추천 기록" />
            <RecentLogs title="최신 기록" contentWithItem={filteredItems} />
            <div ref={ref}>{isFetchingNextPage && <p>데이터를 받아오는 중....</p>}</div>
        </main>
    );
};

export default Logs;
