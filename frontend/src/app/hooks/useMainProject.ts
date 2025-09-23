import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useMainProjectStore } from '../stores/useMainProjectStore';
import { ApiResponse, Item } from '../customComponents/MainList';

const fetchMainItems = async (): Promise<Item[]> => {
    const response = await axios.get<ApiResponse<Item>>('/api/MainList?type=mainlist');

    if (response.data && Array.isArray(response.data.data)) {
        return response.data.data;
    } else {
        throw new Error('API 응답 형식이 올바르지 않습니다.');
    }
};

export const useMainProject = () => {
    const setItems = useMainProjectStore((state) => state.setItem);

    return useQuery<Item[], Error>({
        queryKey: ['mainlist'],
        queryFn: async () => {
            const data = await fetchMainItems();
            setItems(data);
            return data;
        },
        staleTime: 1000 * 60 * 5,
    });
};
