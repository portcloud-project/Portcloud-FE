'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Skills } from '../stores/skillStore';

interface Recruit {
    role: string;
    people: string;
    skills: string[];
    count: string;
}

export interface TeamDetailType {
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
    recruitRoles: Recruit[];
    recruitStatus: string;
    skills: string[];
    viewCount: number;
    writerName: string;
    recruits: Recruit[];
    endDate: string;
    contact: string;
    skill: Skills[];
}

export const useTeamDetail = (id: string | null | string[]) => {
    return useQuery<TeamDetailType>({
        queryKey: ['teamDetail', id],
        queryFn: async () => {
            const res = await axios.get('/api/output-teams', {
                params: { id },
            });
            return res.data;
        },
        enabled: !!id,
        staleTime: 1000 * 60 * 5,
    });
};
