import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ApiResponse } from '../customComponents/MainList';

interface BookMarkData {
    id: string;
    title: string;
    createTime: string;
    thumbnailURL: string;
    type: string;
}

const fetchBookMark = async (): Promise<BookMarkData[]> => {
    try {
        const response = await axios.get<ApiResponse<BookMarkData[]>>('/api/mypage-bookmark');
        return response.data.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const useMypageBookMark = () => {
    return useQuery<BookMarkData[], Error>({
        queryKey: ['mypage-bookmark'],
        queryFn: async () => {
            const data = await fetchBookMark();
            return data;
        },
    });
};
