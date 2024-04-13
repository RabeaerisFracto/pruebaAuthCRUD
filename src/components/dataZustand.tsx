import {create} from 'zustand';

interface IZustand {
    count: number;

}

export const useZustand = create<IZustand>(()=>({
    count:456456456
}))

export default useZustand;

