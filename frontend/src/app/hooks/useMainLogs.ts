import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ApiResponse } from '../customComponents/MainList';
import { AllLogs } from './useRecentLogs';

const fetchMainLogs = async (): Promise<AllLogs[]> => {
    const response = await axios.get<ApiResponse<AllLogs>>('/api/mainlogs');

    if (response.data && Array.isArray(response.data.data)) {
        return response.data.data;
    } else {
        throw new Error('API 응답 형식이 올바르지 않습니다.');
    }
};

export const useMainLogs = () => {
    return useQuery<AllLogs[], Error>({
        queryKey: ['mainlogs'],
        queryFn: async () => {
            const data = await fetchMainLogs();
            return data;
        },
        staleTime: 1000 * 60 * 5,
    });
};
