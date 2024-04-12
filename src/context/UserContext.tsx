import { createContext } from "react";

export type User = {
    id: string;
    email: string;
}

export const UserContext = createContext(undefined); // Se crea un contexto vacío