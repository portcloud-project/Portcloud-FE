import axios from 'axios';
import { ApiResponse } from '../customComponents/MainList';
import { useQuery } from '@tanstack/react-query';
import { TeamDetailType } from './useTeamsDetail';

const fetchAllTeam = async (): Promise<TeamDetailType[]> => {
    const response = await axios.get<ApiResponse<TeamDetailType[]>>('/api/recentteam');
    if (response.data && Array.isArray(response.data.data)) {
        return response.data.data;
    } else {
        throw new Error('API 응답 형식이 올바르지 않습니다.');
    }
};

export const useAllTeam = () => {
    return useQuery<TeamDetailType[], Error>({
        queryKey: ['allteam'],
        queryFn: async () => {
            const data = await fetchAllTeam();
            return data;
        },
    });
};
