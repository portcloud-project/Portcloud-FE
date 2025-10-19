import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Cookies from 'js-cookie';

export const useLikeTeamDelete = () => {
    const token = Cookies.get('accessToken');

    return useMutation({
        mutationFn: async (id: string | string[]) => {
            const response = await axios.delete(`/api/like-team-delete?id=${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.status;
        },
    });
};
