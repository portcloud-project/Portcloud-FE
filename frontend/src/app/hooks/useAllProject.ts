import axios from 'axios';
import { ApiResponse } from '../customComponents/MainList';
import { useQuery } from '@tanstack/react-query';
import { UploadProjectsFormValuesType } from '../upload/projects/page';

const fetchAllProject = async (): Promise<UploadProjectsFormValuesType[]> => {
    const response = await axios.get<ApiResponse<UploadProjectsFormValuesType[]>>('/api/allproject');
    if (response.data && Array.isArray(response.data.data)) {
        return response.data.data;
    } else {
        throw new Error('API 응답 형식이 올바르지 않습니다.');
    }
};

export const useAllProject = () => {
    return useQuery<UploadProjectsFormValuesType[], Error>({
        queryKey: ['allproject'],
        queryFn: async () => {
            const data = await fetchAllProject();
            return data;
        },
    });
};
