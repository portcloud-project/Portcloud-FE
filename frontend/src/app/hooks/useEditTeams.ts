import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import Cookies from 'js-cookie';
import { TeamDetailType } from './useTeamsDetail';

export const useEditTeams = (id: string | null | string[]) =>
    useMutation({
        mutationKey: ['teams-edit'],
        mutationFn: async (data: TeamDetailType) => {
            const token = Cookies.get('accessToken');
            const response = await axios.put('/api/edit-teams', data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: { id },
            });
            return response.data;
        },
    });
