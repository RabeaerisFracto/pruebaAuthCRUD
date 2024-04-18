import { useEffect, useMemo, useState } from 'react';
import { client } from '../supabase/client';
import useUserStore from '../store/userDataStore';

async function UserData() {

const [user, setUser] = useState<any>();
const [email, setEmail] = useState('nada' as string | undefined);
const [id, setId] = useState('nada' as string | undefined);
const setZusUser = useUserStore((state) => state.setUser);

useEffect(()=>{setZusUser(user)},[user, setZusUser])

useEffect(()=>{
    async function getUserData(){
                await client.auth.getUser().then(({data}) => {;
                setUser(data.user);
                setEmail(data.user?.email);
                setId(data.user?.id);
                // console.log("Data desde el hook UserData");
            }
        );
        }
    getUserData();
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