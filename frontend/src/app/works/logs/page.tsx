'use client';
import MainLogs from '@/app/customComponents/MainLogs';
import RecentLogs from '@/app/customComponents/RecentLogs';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { SearchType } from '../portfolios/page';
import { useRecentLogs } from '@/app/hooks/useRecentLogs';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import MyPageLogs from '@/app/customComponents/MypageLogs';

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
        <main className="w-full px-[24px] flex flex-col justify-start items-start mx-auto laptop:max-w-[1440px] tablet:w-full gap-[48px]">
            <Tabs className="flex flex-col  w-full gap-[48px]" defaultValue="my-logs">
                <TabsList className="flex gap-[12px] items-center">
                    <TabsTrigger
                        value="my-logs"
                        className="cursor-pointer text-gray-500  data-[state=active]:text-black data-[state=active]:font-bold "
                    >
                        내 기록
                    </TabsTrigger>
                    <div className="border-r h-[14px] border-gray-300" />
                    <TabsTrigger
                        value="like-logs"
                        className="cursor-pointer text-gray-500  data-[state=active]:text-black data-[state=active]:font-bold"
                    >
                        추천기록
                    </TabsTrigger>
                    <div className="border-r h-[14px] border-gray-300" />
                    <TabsTrigger
                        value="recent-logs"
                        className="cursor-pointer text-gray-500  data-[state=active]:text-black data-[state=active]:font-bold"
                    >
                        최신기록
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="recent-logs">
                    <RecentLogs contentWithItem={filteredItems} />
                </TabsContent>
                <TabsContent value="like-logs">
                    <MainLogs />
                </TabsContent>
                <TabsContent value="my-logs">
                    <MyPageLogs />
                </TabsContent>
            </Tabs>

            <div ref={ref}>{isFetchingNextPage && <p>데이터를 받아오는 중....</p>}</div>
        </main>
    );
};

export default Logs;
