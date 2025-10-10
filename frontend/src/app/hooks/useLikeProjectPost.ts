'use client';

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Cookies from 'js-cookie';

export const useLikeProjectPost = () => {
    const token = Cookies.get('accessToken');

    return useMutation({
        mutationFn: async (id: string | string[]) => {
            const response = await axios.post(
                `/api/likeprojectpost?id=${id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            return response.status;
        },
    });
};
