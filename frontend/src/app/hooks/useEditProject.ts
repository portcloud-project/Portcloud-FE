import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import Cookies from 'js-cookie';

export const useEditProject = (id: string | null | string[]) =>
    useMutation({
        mutationKey: ['project-edit'],
        mutationFn: async (formData: FormData) => {
            const token = Cookies.get('accessToken');
            const response = await axios.put('/api/edit-project', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: { id },
            });
            return response.data;
        },
    });
