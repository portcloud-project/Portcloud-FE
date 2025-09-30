// hooks/usePortfolioDetail.ts
'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { AllLogs } from './useAllLogs';

export const useLogsDetail = (id: string | null | string[]) => {
    return useQuery<AllLogs>({
        queryKey: ['logsDetail', id],
        queryFn: async () => {
            const res = await axios.get('/api/logsoutput', {
                params: { id },
            });
            return res.data;
        },
        enabled: !!id,
        staleTime: 1000 * 60 * 5,
    });
};
