'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { LikeData } from '../customComponents/Like';

const fetchLike = async (id: string | string[]): Promise<LikeData> => {
    try {
        const response = await axios.get('/api/likeproject', {
            params: {
                id,
            },
        });
        console.log(response.data.data);
        return response.data.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const useLikeProejct = (id: string | string[]) => {
    return useQuery<LikeData>({
        queryKey: ['like-project', id],
        queryFn: async () => {
            const data = await fetchLike(id);
            return data;
        },
        enabled: !!id,
    });
};
