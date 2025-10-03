import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FormData } from '../upload/portfolios/page';
export interface RecentPortfolioType<T> {
    content: T[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
    hasNext: boolean;
    hasPrevious: boolean;
    count: number;
}

// const limit = 12;

export const useRecentTeam = () => {
    return useInfiniteQuery<RecentPortfolioType<FormData>, Error>({
        queryKey: ['recentTeam'],
        initialPageParam: 0,
        queryFn: async () => {
            const { data } = await axios.get('/api/recentteam');
            return data;
        },
        getNextPageParam: (lastPage) => (lastPage.last ? undefined : lastPage.page + 1),
        staleTime: 1000 * 60 * 5,
    });
};
