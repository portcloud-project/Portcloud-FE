import { create } from 'zustand';
import Cookies from 'js-cookie';
interface AuthState {
    token: string | null;
    // eslint-disable-next-line no-unused-vars
    setToken: (token: string | null) => void;
    logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
    token: null,
    setToken: (token) => {
        if (token) {
            Cookies.set('accessToken', token, { path: '/', sameSite: 'strict' });
            set({ token });
        }
    },
    logout: () => {
        console.log('logout called');
        Cookies.remove('accessToken', { path: '/', sameSite: 'strict' });
        set({ token: null });
    },
}));

export default useAuthStore;
