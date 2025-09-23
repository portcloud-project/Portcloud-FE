import axios from 'axios';
import { ApiResponse } from '../customComponents/MainList';
import { useQuery } from '@tanstack/react-query';

const fetchPortfolioOutput = async (): Promise<FormData> => {
    const response = await axios.get<ApiResponse<FormData>>('api/portfoliooutput'); // id 값 넘겨줘야함
    if (response) {
        return response.data.data;
    } else {
        throw new Error('API 응답 형식이 올바르지 않습니다.');
    }
};

export const usePortfolioOutput = () => {
    return useQuery<FormData, Error>({
        queryKey: ['portfolioOutput'],
        queryFn: async () => {
            const data = await fetchPortfolioOutput();
            return data;
        },
        staleTime: 1000 * 60 * 5,
    });
};
