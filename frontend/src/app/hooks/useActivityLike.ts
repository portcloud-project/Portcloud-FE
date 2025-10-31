import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface ActivityLike {
    id: string;
    title: string;
    createTime: string;
    type: string;
    thumbnailURL: string;
}

const fetchActivityLike = async (): Promise<ActivityLike[]> => {
    try {
        const response = await axios.get('/api/activity-like');
        return response.data.data || [];
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const useActivityLike = () => {
    return useQuery<ActivityLike[], Error>({
        queryKey: ['activity-like'],
        queryFn: () => {
            const data = fetchActivityLike();
            return data;
        },
    });
};
