/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { ApiResponse } from '../customComponents/MainList';
import { UploadProjectsFormValuesType } from '../upload/projects/page';

const fetchAllProject = async (): Promise<UploadProjectsFormValuesType[]> => {
    const res = await axios.get<
        ApiResponse<{ content: UploadProjectsFormValuesType[] }> | { content: UploadProjectsFormValuesType[] }
    >('/api/allproject', { validateStatus: () => true }); // 상태코드 직접 판단

    // 1) 네트워크/상태 검사 (서버에서 상태 보존하므로 여기서 메시지 보임)
    if (res.status < 200 || res.status >= 300) {
        const msg =
            (res.data as any)?.error ||
            `Request failed with status ${res.status}`;
        throw new Error(msg);
    }

    // 2) 스키마 방어
    const maybe = res.data as any;
    const content =
        maybe?.data?.content ?? // { data: { content: [] } }
        maybe?.content;         // { content: [] }

    if (Array.isArray(content)) return content;

    throw new Error('API 응답 형식이 올바르지 않습니다.');
};

export const useAllProject = () => {
    return useQuery<UploadProjectsFormValuesType[], Error>({
        queryKey: ['allproject'],
        queryFn: fetchAllProject,
        staleTime: 60_000,
        retry: 1, // 업스트림 4xx 반복 호출 방지
    });
};
