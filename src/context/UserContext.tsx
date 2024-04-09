import { createContext } from "react";

export interface User {
    id: string;
    email: string;
}

export const UserContext = createContext(undefined); // Se crea un contexto vacío