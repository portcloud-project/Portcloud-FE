import { create } from 'zustand';

interface User {
    name: string | null;
    nickname: string | null;
    sub: string | null;
}

interface UserStore {
    user: User;
    // eslint-disable-next-line no-unused-vars
    setUser: (user: User) => void;
    clearUser: () => void;
}

export const userStore = create<UserStore>((set) => ({
    user: {
        name: null,
        nickname: null,
        sub: null,
    },
    setUser: (user) => set({ user }),
    clearUser: () =>
        set({
            user: {
                name: null,
                nickname: null,
                sub: null,
            },
        }),
}));
