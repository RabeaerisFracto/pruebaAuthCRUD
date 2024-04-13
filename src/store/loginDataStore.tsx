import {create} from 'zustand';

interface IZustand {count: number; count2: number;count3: string;}
export const useZustand = create<IZustand>(()=>({
    count:456456456,
    count2: 123123123,
    count3: "Hola mundo",
}))
export default useZustand;
