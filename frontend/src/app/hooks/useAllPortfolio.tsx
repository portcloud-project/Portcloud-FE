import axios from 'axios';
import { ApiResponse } from '../customComponents/MainList';
import { useQuery } from '@tanstack/react-query';

interface AllPortfolio {
    id: string;
    title: string;
    email: string;
    jopPosition: string;
    introductions: string;
    createAt: string;
}

const fetchAllportfolio = async (): Promise<AllPortfolio[]> => {
    const response = await axios.get<ApiResponse<AllPortfolio[]>>('/api/allportfolio');
    if (response.data && Array.isArray(response.data.data)) {
        return response.data.data;
    } else {
        throw new Error('API 응답 형식이 올바르지 않습니다.');
    }
};

export const useAllPortfolio = () => {
    return useQuery<AllPortfolio[], Error>({
        queryKey: ['allportfolio'],
        queryFn: async () => {
            const data = await fetchAllportfolio();
            return data;
        },
    });
};
