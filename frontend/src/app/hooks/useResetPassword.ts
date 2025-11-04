import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface PasswordResetPayload {
    newPassword: string;
    newPasswordConfirm: string;
}
const fetchResetPassword = async (data: PasswordResetPayload) => {
    try {
        const response = await axios.post('/api/password-reset', data);
        return response.data.data || [];
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const usePasswordReset = () => {
    return useMutation({
        mutationFn: (data: PasswordResetPayload) => fetchResetPassword(data),
    });
};
