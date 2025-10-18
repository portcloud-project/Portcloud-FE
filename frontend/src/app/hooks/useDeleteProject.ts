import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteProject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string | string[] | null) => {
            await axios.delete(`/api/deleteproject`, { params: { id } });
        },
        onSuccess: (_data, id) => {
            queryClient.invalidateQueries({ queryKey: ['projectDetail', id] });
            queryClient.invalidateQueries({ queryKey: ['recent_project'] });
            queryClient.invalidateQueries({ queryKey: ['mainlist'] });
        },
        onError: (err: unknown) => {
            console.error('삭제 실패', err);
        },
    });
};
