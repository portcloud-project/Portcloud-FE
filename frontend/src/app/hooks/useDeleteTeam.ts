// src/app/hooks/useDeleteTeam.ts
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteTeam = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string | number) => {
            const v = String(id);
            if (!v) throw new Error('id required');
            
            return axios.delete(`/api/deleteteam/${encodeURIComponent(v)}`, {
                validateStatus: () => true,
            });
        },
        onSuccess: (_data, id) => {
            queryClient.invalidateQueries({ queryKey: ['teamDetail', id] });
        },
        onError: (err) => {
            console.error('삭제 실패', err);
        },
    });
};
