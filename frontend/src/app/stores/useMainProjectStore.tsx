import { create } from 'zustand';
import { Item } from '../customComponents/MainList';

interface MainProject {
    items: Item[] | null;
    // eslint-disable-next-line no-unused-vars
    setItem: (items: Item[]) => void;
}

export const useMainProjectStore = create<MainProject>((set) => ({
    items: null,
    setItem: (items) => set({ items }),
}));
