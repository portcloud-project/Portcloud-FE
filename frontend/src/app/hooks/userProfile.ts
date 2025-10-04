import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Cookies from 'js-cookie';

export const useUserProfile = () =>
    useMutation({
        mutationKey: ['user-profile'],
        mutationFn: async (formdata: FormData) => {
            const token = Cookies.get('accessToken');
            const response = await axios.patch('/api/user-profile', formdata, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        },
    });
