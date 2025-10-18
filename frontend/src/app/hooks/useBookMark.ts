import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface BookMarkProps {
    keyName: string;
    apiName: string;
}
export const useBookMark = ({ keyName, apiName }: BookMarkProps) => {
    return useMutation({
        mutationKey: [`BookMark_${keyName}`],
        mutationFn: async (id: string | string[]) => {
            try {
                const response = axios.post(
                    `/api/${apiName}-bookmark-post`,
                    {},
                    {
                        params: { id },
                    },
                );
                return response;
            } catch (err) {
                console.error(err);
                throw err;
            }
        },
    });
};
