import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ApiResponse } from '../customComponents/MainList';

export interface CommentView {
    id: string;
    comment: string | null;
    parentId: string | null;
    userId: string;
    userProfileURL: string | null;
    userWriteName: string;
    createdAt: string;
    replies: CommentView[]; // 재귀 구조
    owner: boolean;
}
const fetchCommentView = async (id: string | string[]): Promise<CommentView[]> => {
    try {
        const response = await axios.get<ApiResponse<CommentView[]>>(
            `/api/comment-get-portfolio?id=${id}`,
        );
        return response.data.data; // 여기서 배열 반환
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const useCommentView = (id: string | string[]) => {
    return useQuery<CommentView[], Error>({
        queryKey: ['comment-view', id],
        queryFn: () => fetchCommentView(id),
    });
};
