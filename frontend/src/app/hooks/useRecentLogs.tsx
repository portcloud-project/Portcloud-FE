import axios from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query';

export interface AllLogs {
    id: number;
    title: string;
    content: string;
    thumbnailUrl: string;
    category: string;
    blogStatus: number | string;
    owner: boolean;
    writeName: string;
    userId: number;
    userProfileURL: string;
    createdAt: string;
}
interface ApiResponseWithContent<T> {
    status: number;
    message: string | null;
    data: {
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
    };
}
const limit = 12;

export const useRecentLogs = () => {
    return useInfiniteQuery<ApiResponseWithContent<AllLogs>, Error>({
        queryKey: ['recentlogs'],
        initialPageParam: 0,
        queryFn: async ({ pageParam = 0 }) => {
            const { data } = await axios.get('/api/recentlogs', {
                params: { page: pageParam, size: limit },
            });
            return data;
        },
        getNextPageParam: (lastPage) => (lastPage.data.last ? undefined : lastPage.data.page + 1),
        staleTime: 1000 * 60 * 5,
    });
};
