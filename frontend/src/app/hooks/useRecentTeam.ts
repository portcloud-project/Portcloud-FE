import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface TeamItem {
    id: number;
    title: string | null;
    writerName: string;
    projectType?: string | null;
    createdAt: string;
    recruitStatus?: string;
    viewCount?: number;
    likeCount?: number;
    requiredRoles?: string[];
    recruitDeadline?: string | null;
}

export interface Page<T> {
    content: T[];
    page: number;
    size: number;
    last: boolean;
    totalElements: number;
    totalPages: number;
}

const limit = 12;

export const useRecentTeam = () => {
    return useInfiniteQuery<Page<TeamItem>, Error>({
        queryKey: ['recent_team'],
        initialPageParam: 0,
        queryFn: async ({ pageParam = 0 }) => {
            const { data } = await axios.get('/api/recentteam', {
                params: { page: pageParam, size: limit },
            });
            // 라우트가 이미 정규화해서 주므로 그대로 반환
            return data as Page<TeamItem>;
        },
        getNextPageParam: (lastPage) => (lastPage.last ? undefined : lastPage.page + 1),
        staleTime: 1000 * 60 * 5,
    });
};
