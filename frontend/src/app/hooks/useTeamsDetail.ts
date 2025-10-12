'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Recruit {
    role: string;
    count: number;
    people: number;
    skills: string[];
}

interface TeamDetailType {
    title: string;
    bookmarkCount: number;
    bookmarked: boolean;
    comments: string[];
    contactMethod: string;
    content: string;
    createdAt: string;
    id: number;
    likeCount: number;
    liked: boolean;
    owner: boolean;
    projectType: string;
    recruitDeadline: string;
    recruitStatus: string;
    skills: string[];
    viewCount: number;
    writerName: string;
    recruitRoles: Recruit[];
}

export const useTeamDetail = (id: string | null | string[]) => {
    return useQuery<TeamDetailType>({
        queryKey: ['teamDetail', id],
        queryFn: async () => {
            const res = await axios.get('/api/output-teams', {
                params: { id },
            });
            console.log(res.data);
            return res.data;
        },
        enabled: !!id,
        staleTime: 1000 * 60 * 5,
    });
};
