'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { UploadTeamsFormValuesType } from '../upload/teams/page';

export const useTeamDetail = (id: string | null | string[]) => {
    return useQuery<UploadTeamsFormValuesType>({
        queryKey: ['teamDetail', id],
        queryFn: async () => {
            const res = await axios.get('/api/output-teams', {
                params: { id },
            });
            console.log(res.data);
            return res.data;
        },
        enabled: !!id,
        staleTime: 1000 * 60 * 5,
    });
};
