import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ApiResponse, Item } from '../customComponents/MainList';

const fetchMainPortfolio = async (): Promise<Item[]> => {
    const response = await axios.get<ApiResponse<Item>>('/api/mainportfolio');

    if (response.data && Array.isArray(response.data.data)) {
        return response.data.data;
    } else {
        throw new Error('API 응답 형식이 올바르지 않습니다.');
    }
};

export const useMainPortfolio = () => {
    return useQuery<Item[], Error>({
        queryKey: ['mainportfolio'],
        queryFn: async () => {
            const data = await fetchMainPortfolio();
            return data;
        },
        staleTime: 1000 * 60 * 5,
    });
};
