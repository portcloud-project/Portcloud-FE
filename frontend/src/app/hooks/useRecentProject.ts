import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { UploadProjectsFormValuesType } from '../upload/projects/page';
export interface RecentProjectType<T> {
    data:T[];
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
    thumbnail: string;
    id: number;
    description: string;
    title: string;
    writeName: string;
    thumbnailURL: string; 
}
const limit = 12;

export const useRecentProject = () => {
    return useInfiniteQuery<RecentProjectType<UploadProjectsFormValuesType>, Error>({
        queryKey: ['recent_project'],
        initialPageParam: 0,
        queryFn: async () => {
            const { data } = await axios.get('/api/recentproject', {
                params: { page: 0, size: limit },
            });
            return data;
        },
        getNextPageParam: (lastPage) => (lastPage.last ? undefined : lastPage.page + 1),
        staleTime: 1000 * 60 * 5,
    });
};
