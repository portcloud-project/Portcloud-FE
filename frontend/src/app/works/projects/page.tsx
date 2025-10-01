'use client';

import MainList from '@/app/customComponents/MainList';
// import RecentProject from '@/app/customComponents/RecentProject';
// import { useRecentProject } from '@/app/hooks/useRecentProject';
// import { useSearchParams } from 'next/navigation';
// import { useEffect } from 'react';
// import { useInView } from 'react-intersection-observer';

export type SearchType = 'title' | 'nickname';

const UserProject = () => {

    // const search = useSearchParams();
    //     const searchTitle = search.get('q')?.toLowerCase() || '';
    //     const searchType = (search.get('type') || 'title') as SearchType;
    
    //     const { ref, inView } = useInView({
    //         threshold: 0.5,
    //         triggerOnce: false,
    //     });
    //     const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useRecentProject();
    
    //     useEffect(() => {
    //         if (inView && hasNextPage && !isFetchingNextPage) {
    //             fetchNextPage();
    //         }
    //     }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);
    
    //     const allItems = data?.pages.flatMap((page) => page.content) ?? [];
    //     const filteredItems = allItems.filter((item) => {
    //         if (!searchTitle) return true;
    
    //         if (searchType === 'title') return item.title.toLowerCase().includes(searchTitle);
    //         if (searchType === 'nickname') return item.writeName.toLowerCase().includes(searchTitle);
    //     });

    return (
        <section className="flex gap-[48px] flex-col justify-center items-center px-[24px]">
            <MainList title="추천 프로젝트" />
            {/* <RecentProject title='최신 프로젝트' items={filteredItems} /> */}
            {/* <div ref={ref}>{isFetchingNextPage && <p>데이터를 받아오는 중....</p>}</div> */}
        </section>
    );
};
export default UserProject;
