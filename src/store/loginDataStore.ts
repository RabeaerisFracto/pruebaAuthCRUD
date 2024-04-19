import {create} from 'zustand';

interface IZustand {
    [key: string]: string;
}
export const useZustand = create<IZustand>(()=>({
    folio1:"P6031209",
    folio2: "P6031217",
    folio3: "P6031225",
    folio4: "P6031233",
    folio5: "P6031241",
}))
export default useZustand;
