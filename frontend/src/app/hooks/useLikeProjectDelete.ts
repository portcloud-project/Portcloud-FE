import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Cookies from 'js-cookie';

export const useLikeProjectDelete = (onSuccess?: () => void) => {
    const token = Cookies.get('accessToken');

    return useMutation({
        mutationFn: async (id: string | string[]) => {
            const response = await axios.delete(`/api/likeprojectdelete?id=${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.status;
        },
        onSuccess: () => {
            if (onSuccess) onSuccess();
        },
    });
};
