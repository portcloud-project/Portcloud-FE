import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
const fetchResetPassword = async () => {
    try {
        const response = await axios.post('/api/password-reset');
        return response.data.data || [];
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const useActivityComment = () => {
    return useMutation({
        mutationFn: () => {
            const data = fetchResetPassword();
            return data;
        },
    });
};
