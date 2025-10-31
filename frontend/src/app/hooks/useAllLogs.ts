import axios from 'axios';
import { ApiResponse } from '../customComponents/MainList';
import { useQuery } from '@tanstack/react-query';

interface AllLogs {
    id: string;
    title: string;
    email: string;
    jopPosition: string;
    introductions: string;
    createAt: string;
    thumbnailUrl: string;
}

const fetchAllLogs = async (): Promise<AllLogs[]> => {
    try {
        const response = await axios.get<ApiResponse<AllLogs[]>>('/api/allLogs');
        if (response.data && Array.isArray(response.data.data)) {
            return response.data.data;
        }
        if (typeof response.data === 'number' && response.data === 404) {
            return [];
        } else {
            throw new Error(response.data.message || '오류가 발생하였습니다.');
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // 404 처리
            if (error.response?.data.status === 404) {
                console.log(error);
                throw new Error(error.response.data?.message || '기록이 존재하지 않습니다.');
            }
            // 기타 Axios 에러
            throw new Error(error.response?.data?.message || '서버 요청 중 오류가 발생했습니다.');
        }
        // Axios가 아닌 에러
        throw error;
    }
};

export const useAllLogs = () => {
    return useQuery<AllLogs[], Error>({
        queryKey: ['alllogs'],
        queryFn: async () => {
            const data = await fetchAllLogs();
            return data;
        },
    });
};
