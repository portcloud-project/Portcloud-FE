'use client';
import MainPortfolio from '@/app/customComponents/MainPortfolio';
import RecentPortfolio from '@/app/customComponents/RecentPortfolio';
import { useRecentPortfolio } from '@/app/hooks/useRecentPortfolio';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export type SearchType = 'title' | 'nickname';
const UserPortfolios = () => {
    const search = useSearchParams();
    const searchTitle = search.get('q')?.toLowerCase() || '';
    const searchType = (search.get('type') || 'title') as SearchType;

    const { ref, inView } = useInView({
        threshold: 0.5,
        triggerOnce: false,
    });
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useRecentPortfolio();

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    const allItems = data?.pages.flatMap((page) => page.content) ?? [];
    const filteredItems = allItems.filter((item) => {
        if (!searchTitle) return true;

        if (searchType === 'title') return item.title.toLowerCase().includes(searchTitle);
        if (searchType === 'nickname') return item.writeName.toLowerCase().includes(searchTitle);
    });

    return (
        <section className="flex gap-[48px] flex-col justify-center items-center px-[24px]">
            <MainPortfolio title={'추천 포트폴리오'} />
            <RecentPortfolio title={'최신 포트폴리오'} items={filteredItems} />
            <div ref={ref}>{isFetchingNextPage && <p>데이터를 받아오는 중....</p>}</div>
        </section>
    );
};

export default UserPortfolios;
