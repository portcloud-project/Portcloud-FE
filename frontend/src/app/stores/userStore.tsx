import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

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

export const userStore = create<UserStore>()(
    persist(
        (set) => ({
            user: {
                name: null,
                nickname: null,
                sub: null,
            },
            setUser: (user) => set({ user }),
            clearUser: () => {
                set({
                    user: {
                        name: null,
                        nickname: null,
                        sub: null,
                    },
                });
                localStorage.removeItem('user');
            },
        }),
        {
            name: 'user',
            storage: createJSONStorage(() => localStorage),
        },
    ),
);
