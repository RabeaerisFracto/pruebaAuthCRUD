import { useEffect, useState } from 'react';
import { client } from '../supabase/client';//Se importa el cliente de supabase, desde aca se hara la peticion a la DB.
import useUserStore from '../store/userDataStore';//Se importa el store de zustand, para setear el estado user.

async function UserData() {

const [user, setUser] = useState<any>();//Se setea el estado user con la data del usuario logueado.
// const [email, setEmail] = useState('nada' as string | undefined);
// const [id, setId] = useState('nada' as string | undefined);
const setZusUser = useUserStore((state) => state.setUser);//Se setea el estado user del store de zustand.
//OJO: EL STORE DE ZUSTAND NO SE PUEDE USAR DENTRO DE UN HOOK, POR ESO SE USA UNA VARIABLE INTERMEDIA.
//OJO: EL STATE, VA CON EL SET DEL USESTATE, ES DECIR, EL 2DO PARAMETRO DEL USESTATE.

useEffect(()=>{setZusUser(user)},[user, setZusUser])
//Se setea el estado user del store de zustand con el estado user del hook UserData.
//En el 2do parametro del useEffect, se pasan las dependencias del hook UserData y del store de zustand.
useEffect(()=>{
    async function getUserData(){//Mediante Async Await, se obtiene la data del usuario logueado.
                await client.auth.getUser().then(({data}) => {;
                setUser(data.user);//Se setea el estado user con la data del usuario logueado.
                // setEmail(data.user?.email);
                // setId(data.user?.id);
                // console.log("Data desde el hook UserData");
            }
        );
        }
    getUserData();//Se llama a la funcion getUserData, dentro del useEffect.
    }
    ,[]);
//En 1er useMemo, se setea el estado user con la data del usuario logueado.
//Pero este estado cambia despues del 1er render, por lo que se usa el 2do useMemo para mostrar la data en consola.

// useEffect(()=>{
//     if(user && email && id){
//         console.log(user)
//         console.log(email)
//         console.log(id)
//     }},[user, email, id])

    // return user;
}

export default UserData;