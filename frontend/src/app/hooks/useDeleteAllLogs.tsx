import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteLogs = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string | string[]) => {
            await axios.delete(`/api/delete-logs`, { params: { id } });
        },
        onSuccess: (_data, id) => {
            queryClient.invalidateQueries({ queryKey: ['logsDetail', id] });
            queryClient.invalidateQueries({ queryKey: ['recentlogs'] });
            queryClient.invalidateQueries({ queryKey: ['mainlogs'] });
        },
        onError: (err: unknown) => {
            console.error('삭제 실패', err);
        },
    });
};
