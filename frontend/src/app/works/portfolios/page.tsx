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
    const { data, fetchNextPage, isLoading, hasNextPage, isFetchingNextPage } =
        useRecentPortfolio();

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
    console.log(filteredItems);
    return (
        <section className="flex gap-[48px] flex-col justify-center items-center px-[24px]">
            {!searchTitle && (
                <div className="w-full flex flex-col gap-[48px] justify-center items-center ">
                    <MainPortfolio title={'추천 포트폴리오'} />
                    <RecentPortfolio title={'최신 포트폴리오'} items={filteredItems} />
                </div>
            )}
            {searchTitle && (
                <div className="w-full flex flex-col">
                    <div className="flex gap-2">
                        <div className="text-purple-500 font-bold">{searchTitle}</div>
                        <div className="font-semibold">에 대한 검색 결과</div>
                    </div>
                    <RecentPortfolio title={''} items={filteredItems} />
                </div>
            )}
            {!isLoading && filteredItems.length === 0 && (
                <div className="flex flex-col justify-center items-center absolute top-[40vh] gap-[24px]">
                    <div className="text-[40px] font-bold">
                        아직 포트폴리오가 등록되지 않았어요!
                    </div>
                    <div className="text-[28px] font-bold">{searchTitle}에 대한 검색 결과 0건</div>
                </div>
            )}
            <div ref={ref}>{isFetchingNextPage && <p>데이터를 받아오는 중....</p>}</div>
        </section>
    );
};

export default UserPortfolios;
