import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Cookies from 'js-cookie';
interface CommentPayload {
    id: string | string[];
    comment: string;
    parentCommentId: string | null;
}
export const useCommentProjectPost = () => {
    const token = Cookies.get('accessToken');
    const queryclient = useQueryClient();
    return useMutation<number, Error, CommentPayload>({
        mutationFn: async ({ id, comment, parentCommentId }) => {
            const response = await axios.post(
                `/api/comment-post-projects?id=${id}`,
                { comment, parentCommentId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            return response.status;
        },
        onSuccess: (_, variables: CommentPayload) => {
            queryclient.invalidateQueries({
                queryKey: ['comment-view', variables.id],
            });
        },
    });
};
