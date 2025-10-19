import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import Cookies from 'js-cookie';

export const useLogsEdit = (id: string | null | string[]) =>
    useMutation({
        mutationKey: ['logs-edit'],
        mutationFn: async (data: FormData) => {
            const token = Cookies.get('accessToken');
            const response = await axios.put('/api/edit-logs', data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: { id },
            });
            return response.data;
        },
    });
