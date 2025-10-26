import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Cookies from 'js-cookie';
interface CommentPayload {
    id: string | string[];
    comment: string;
    parent_id?: string | null;
    parentCommentId: string | null;
}
export const useCommentTeamPost = () => {
    const token = Cookies.get('accessToken');
    const queryclient = useQueryClient();
    return useMutation<number, Error, CommentPayload>({
        mutationFn: async ({ id, comment, parent_id }) => {
            const response = await axios.post(
                `/api/comment-post-team?id=${id}`,
                { comment, parent_id },
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
                queryKey: ['comment-view-team', variables.id],
            });
        },
    });
};
