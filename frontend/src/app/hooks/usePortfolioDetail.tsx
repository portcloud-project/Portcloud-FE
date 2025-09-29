// hooks/usePortfolioDetail.ts
'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FormData } from '../upload/portfolios/page';

export const usePortfolioDetail = (id: string | null | string[]) => {
    return useQuery<FormData>({
        queryKey: ['portfolioDetail', id],
        queryFn: async () => {
            const res = await axios.get('/api/portfoliooutput', {
                params: { id },
            });
            console.log(res.data);
            return res.data;
        },
        enabled: !!id,
        staleTime: 1000 * 60 * 5,
    });
};
