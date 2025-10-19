'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { UploadProjectsFormValuesType } from '../upload/projects/page';

export const useProjectDetail = (id: string | null | string[]) => {
    return useQuery<UploadProjectsFormValuesType>({
        queryKey: ['projectDetail', id],
        queryFn: async () => {
            const res = await axios.get('/api/output-project', {
                params: { id },
            });
            return res.data;
        },
        enabled: !!id,
        staleTime: 1000 * 60 * 5,
    });
};
