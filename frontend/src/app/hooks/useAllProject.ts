import axios from 'axios';
import { ApiResponse } from '../customComponents/MainList';
import { useQuery } from '@tanstack/react-query';
import { UploadProjectsFormValuesType } from '../upload/projects/page';

const fetchAllProject = async (): Promise<UploadProjectsFormValuesType[]> => {
    const response =
        await axios.get<ApiResponse<{ content: UploadProjectsFormValuesType[] }>>(
            '/api/allproject',
        );
    const content = response.data?.data?.content;
    if (Array.isArray(content)) {
        return content;
    } else if (response.data.status === 404) {
        throw new Error('내 프로젝트가 존재하지 않습니다.');
    } else {
        throw new Error(response.data.message || '오류가 발생하였습니다.');
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
