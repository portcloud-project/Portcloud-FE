import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Cookies from 'js-cookie';

interface CommentPayload {
    id: string | string[]; // 포트폴리오 ID
    parentCommentId: string; // 삭제할 댓글 ID
}

export const useCommentDelete = () => {
    const token = Cookies.get('accessToken');
    const queryclient = useQueryClient();

    return useMutation<number, Error, CommentPayload>({
        mutationFn: async ({ id, parentCommentId }) => {
            const response = await axios.delete(`/api/comment-delete-portfolio`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: { id, parentCommentId },
            });

            return response.status;
        },
        onSuccess: (_, variable) => {
            queryclient.invalidateQueries({
                queryKey: ['comment-view', variable.id],
            });
        },
    });
};
