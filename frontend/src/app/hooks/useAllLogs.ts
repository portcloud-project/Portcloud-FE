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
    const response = await axios.get<ApiResponse<AllLogs[]>>('/api/allLogs');
    if (response.data && Array.isArray(response.data.data)) {
        return response.data.data;
    } else {
        throw new Error('API 응답 형식이 올바르지 않습니다.');
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
