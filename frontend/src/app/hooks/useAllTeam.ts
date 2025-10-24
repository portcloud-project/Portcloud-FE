import axios from 'axios';
import { ApiResponse } from '../customComponents/MainList';
import { useQuery } from '@tanstack/react-query';
import { TeamDetailType } from './useTeamsDetail';

const fetchAllTeam = async (): Promise<TeamDetailType[]> => {
    const response = await axios.get<ApiResponse<TeamDetailType[]>>('/api/allteam');
    if (response.data && Array.isArray(response.data.data)) {
        return response.data.data;
    } else if (response.data.status === 404) {
        throw new Error('내 팀구하기가 존재하지 않습니다.');
    } else {
        throw new Error(response.data.message || '오류가 발생하였습니다.');
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
