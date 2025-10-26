import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchBookMark = async () => {
    try {
        const response = await axios.get('/api/mypage-bookmark');
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const useMypageBookMark = () => {
    return useQuery({
        queryKey: ['mypage-bookmark'],
        queryFn: async () => {
            const data = await fetchBookMark();
            return data;
        },
    });
};
