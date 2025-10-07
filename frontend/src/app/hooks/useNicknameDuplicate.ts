import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Cookies from 'js-cookie';

export const useNicknameDuplicate = () =>
    useMutation({
        mutationFn: async (nickname: string) => {
            const token = Cookies.get('accessToken');
            console.log('mutate call');
            const response = await axios.get('/api/nickname-duplicate', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: { nickname },
            });
            console.log(response.data);

            return response.data;
        },
    });
