import { create } from "zustand";

interface User {
    id: string;
}

interface UserStore {
    user: User | null;
    setUser: (user: User) => void;
}

const useUserStore = create<UserStore>((set) => ({
    user: null,
    setUser: (userData) => set({ user: userData}),
}));

export default useUserStore;