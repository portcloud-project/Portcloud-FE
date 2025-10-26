// hooks/useAllTeam.ts
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { TeamDetailType } from './useTeamsDetail';

type AllTeamResponse = {
    data: TeamDetailType[];
    meta?: { sourceKey?: string | null };
};

const fetchAllTeam = async (): Promise<TeamDetailType[]> => {
    const res = await axios.get<AllTeamResponse>('/api/allteam', {
        // 필요 시 쿠키 포함 세션 호출: (Next.js 동일 오리진이면 보통 불필요)
        withCredentials: true,
    });

    // 라우트가 항상 { data: [] } 형태 보장
    return res.data.data;
};

export const useAllTeam = () => {
    return useQuery<TeamDetailType[], Error>({
        queryKey: ['allteam'],
        queryFn: fetchAllTeam,
        retry: 0, // 개발 단계에선 실패 즉시 에러 확인
    });
};
