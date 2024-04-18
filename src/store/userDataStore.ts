import {create} from "zustand";// Se importa la libreria zustand

interface UserState {//interfaz xke es TS
    user: any;
    setUser: (user: any) => void;  
}

const useUserStore = create<UserState>((set) => ({//Se parece al useState, pero con zustand
    user: null,
    setUser: (userData) => set({ user: userData}),
}));


export default useUserStore;//Mantener exportacion default simple.