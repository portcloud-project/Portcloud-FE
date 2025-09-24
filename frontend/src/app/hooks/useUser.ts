import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';

const fetchUser = async () => {
    const token = Cookies.get('accessToken');
    if (!token) return null;

    return { token };
};

export const useUser = () => {
    return useQuery({
        queryKey: ['user'],
        queryFn: fetchUser,
        retry: false,
        refetchOnWindowFocus: false,
    });
};
