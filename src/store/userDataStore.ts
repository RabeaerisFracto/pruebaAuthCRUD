import {create} from "zustand";

interface UserState {
    user: any;
    setUser: (user: any) => void;  
}

const useUserStore = create<UserState>((set) => ({
    user: null,
    setUser: (userData) => set({ user: userData}),
}));


export default useUserStore;