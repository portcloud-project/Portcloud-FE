import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface BookMarkProps {
    keyName: string;
    apiName: string;
}
export const useBookMarkDelete = ({ keyName, apiName }: BookMarkProps) => {
    return useMutation({
        mutationKey: [`BookMark_${keyName}_delete`],
        mutationFn: async (id: string | string[]) => {
            try {
                const response = axios.delete(
                    `/api/${apiName}-bookmark-delete`,

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
