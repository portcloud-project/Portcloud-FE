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
    file: string;
}

const fetchAllportfolio = async (): Promise<AllPortfolio[]> => {
    const response = await axios.get<ApiResponse<AllPortfolio[]>>('/api/allportfolio');
    if (response.data && Array.isArray(response.data.data)) {
        return response.data.data;
    } else if (response.data.status === 404) {
        throw new Error('포트폴리오가 존재하지 않습니다.');
    } else {
        throw new Error(response.data.message || '오류가 발생하였습니다.');
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
