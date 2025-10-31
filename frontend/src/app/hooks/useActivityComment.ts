import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface ActivityComment {
    commentId: number;
    comment: string;
    createdAt: string;
    postId: string;
    postTitle: string;
    postType: string;
}

const fetchActivityComment = async (): Promise<ActivityComment[]> => {
    try {
        const response = await axios.get('/api/activity-comment');
        return response.data.data || [];
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const useActivityComment = () => {
    return useQuery<ActivityComment[], Error>({
        queryKey: ['activity-comment'],
        queryFn: () => {
            const data = fetchActivityComment();
            return data;
        },
    });
};
