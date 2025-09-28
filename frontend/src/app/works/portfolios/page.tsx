'use client';
import MainPortfolio from '@/app/customComponents/MainPortfolio';
import RecentPortfolio from '@/app/customComponents/RecentPortfolio';
import { useRecentPortfolio } from '@/app/hooks/useRecentPortfolio';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const UserPortfolios = () => {
    const { ref, inView } = useInView({
        threshold: 0.5,
        triggerOnce: false,
    });
    const { fetchNextPage, hasNextPage, isFetchingNextPage } = useRecentPortfolio();

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    return (
        <section className="flex gap-[48px] flex-col">
            <MainPortfolio title={'추천 포트폴리오'} />
            <RecentPortfolio title={'최신 포트폴리오'} />
            <div ref={ref}>{isFetchingNextPage && <p>데이터를 받아오는 중....</p>}</div>
        </section>
    );
};

export default UserPortfolios;
