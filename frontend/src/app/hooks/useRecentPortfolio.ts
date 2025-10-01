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
const limit = 12;

export const useRecentPortfolio = () => {
    return useInfiniteQuery<RecentPortfolioType<FormData>, Error>({
        queryKey: ['recent_portfolio'],
        initialPageParam: 0,
        queryFn: async ({ pageParam = 0 }) => {
            const { data } = await axios.get('/api/recentportfolio', {
                params: { page: pageParam, size: limit },
            });
            return data;
        },
        getNextPageParam: (lastPage) => (lastPage.last ? undefined : lastPage.page + 1),
        staleTime: 1000 * 60 * 5,
    });
};
