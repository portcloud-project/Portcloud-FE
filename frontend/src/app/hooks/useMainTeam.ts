import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ApiResponse } from '../customComponents/MainList';

export interface TeamGetValueType {
    createdAt: string;
    id: number;
    likeCount: number;
    projectType: string;
    recruitStatus: string;
    requiredRoles: string[];
    title: string;
    viewCount: string;
    writerName: string;
    recruitDeadline: string;
    recruits: RolesType[];
}

interface RolesType {
    role: string;
    count: number;
    people: number;
}

const fetchMainTeam = async (): Promise<TeamGetValueType[]> => {
    const response = await axios.get<ApiResponse<TeamGetValueType[]>>('/api/mainteam');

    if (response.data && Array.isArray(response.data.data)) {
        return response.data.data;
    } else {
        throw new Error('API 응답 형식이 올바르지 않습니다.');
    }
};

export const useMainTeam = () => {
    return useQuery<TeamGetValueType[], Error>({
        queryKey: ['mainteam'],
        queryFn: async () => {
            const data = await fetchMainTeam();
            return data;
        },
        staleTime: 1000 * 60 * 5,
    });
};
