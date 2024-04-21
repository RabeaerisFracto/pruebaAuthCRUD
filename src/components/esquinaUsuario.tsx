import { useEffect, useState } from 'react';
import UserData from './userData';
import useUserStore from '../store/userDataStore';
import { useNavigate } from "react-router-dom";
import { client } from "../supabase/client";

import '../components/stylesheets/esquinaUsuario.css'


export default function EsquinaUsuario() {
    
    const [email, setEmail] = useState('Buscando email...' as string | undefined);
    const [globalname, setGlobalname] = useState('Buscando nombre...' as string | undefined);
    const [provider, setProvider] = useState('Buscando proveedor...' as string | undefined);
    const [avatar, setAvatar] = useState('Buscando avatar...' as string | undefined);

    const user = useUserStore((state) => state.user);
    UserData();

    useEffect(() => {
        if (user == null || user == undefined) { return }
        else {
            setGlobalname(user.user_metadata.full_name)
            setEmail(user.email)
            setProvider(user.app_metadata.provider)
            setAvatar(user.user_metadata.avatar_url)
        }
    }, [user, EsquinaUsuario])

    const navigate = useNavigate();

    async function SignOutUser(){
        const { error } = await client.auth.signOut();
        if (error) {console.log('Error al desconectar:', error.message)}
        else{
            navigate("/login");
            console.log('Desconectado')}
        }

    return (
        <>
        <div className='esquina-usuario'>
            <h4>{email}<br/>
            {globalname ? globalname?.charAt(0).toUpperCase() + globalname?.slice(1) : ''}<br/>
            {provider ? provider.charAt(0).toUpperCase() + provider.slice(1) : ''}<br/></h4>
            <img src={avatar} alt='avatar' />
        </div>
        <button className='botonHome' onClick={()=> navigate("/home")}>Discrepancia</button>
        <button className='botonLista' onClick={()=> navigate("/lista")}>Lista</button>
        <button className='botonLogout' onClick={()=> SignOutUser()}>SignOut</button>
        </>
    )
}