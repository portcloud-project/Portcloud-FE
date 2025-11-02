import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

interface CommentPayload {
    id: string | string[];
    comment: string;
    commentId: string | null;
}
export const useCommentEdit = () => {
    const queryclient = useQueryClient();
    return useMutation<number, Error, CommentPayload>({
        mutationFn: async ({ id, comment, commentId }) => {
            const response = await axios.patch('/api/comment-edit', {
                id,
                commentId,
                comment,
            });
            return response.status;
        },
        onSuccess: (_, variables: CommentPayload) => {
            queryclient.invalidateQueries({
                queryKey: ['comment-view', variables.id],
            });
        },
    });
};
