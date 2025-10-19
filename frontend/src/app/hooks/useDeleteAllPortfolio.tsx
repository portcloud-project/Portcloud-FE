import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeletePortfolio = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string | string[] | null) => {
            await axios.delete(`/api/deleteportfolio`, { params: { id } });
        },
        onSuccess: (_data, id) => {
            queryClient.invalidateQueries({ queryKey: ['portfolioDetail', id] });
            queryClient.invalidateQueries({ queryKey: ['mainportfolio'] });
            queryClient.invalidateQueries({ queryKey: ['recent_portfolio'] });
        },
        onError: (err: unknown) => {
            console.error('삭제 실패', err);
        },
    });
};
