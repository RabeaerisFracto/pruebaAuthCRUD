import { useEffect, useState } from 'react';
import UserData from './userData';
import useUserStore from '../store/userDataStore';
import { Outlet, useNavigate } from 'react-router-dom';
//Se añade Outlet para que se renderice el contenido de las rutas hijas.
import { client } from "../supabase/client";

import '../components/stylesheets/esquinaUsuario.css'



export default function EsquinaUsuario() {
    
    const [email, setEmail] = useState('' as string | undefined);
    const [globalname, setGlobalname] = useState('' as string | undefined);
    const [provider, setProvider] = useState('' as string | undefined);
    const [avatar, setAvatar] = useState('' as string | undefined);

    const user = useUserStore((state) => state.user);
    //En una constante, se selecciona el estado que queremos almacenar en la constante.
    UserData();
    //Esta funcion se llama para obtener la data del usuario logueado.

    const navigate = useNavigate();


    useEffect(() => {
        if (user == null || user == undefined) {
            <button onClick={() => navigate("/login")}>LogIn</button>
        }
        else {
            setGlobalname(user.user_metadata.full_name)
            setEmail(user.email)
            setProvider(user.app_metadata.provider)
            setAvatar(user.user_metadata.avatar_url)
        }
    }, [user, EsquinaUsuario])

    //--------------Colapsar menu contextual-------------------
    const [isChecked, setIsChecked] = useState(true);
    function handleCheckboxChange() {//Como funcion tradicional para facilitar llamado en JSX
        setIsChecked(!isChecked);
    };
    //--------------Log Out-------------------
    async function SignOutUser(){
        const { error } = await client.auth.signOut();
        if (error) {console.log('Error al desconectar:', error.message)}
        else{
            navigate("/login");
            console.log('Desconectado')}
        }

    return (
        <>
        <Outlet/>
        {/* Se ubica Outlet antes del resto del codigo para que Layout quede por sobre pagina ruteada */}
        <div className='esquina-usuario'>
            <label className='label-menu' htmlFor='checkbox-menu'>
                {user ?
                <>
                <h4>{email}<br/>
                    {globalname ? globalname?.charAt(0).toUpperCase() + globalname?.slice(1) : ''}<br/>
                    {provider ? provider.charAt(0).toUpperCase() + provider.slice(1) : ''}<br/></h4>
                    <img src={avatar} alt='' />
                </>
                : <button className='login' onClick={() => navigate("/login")}>LogIn</button>}
                
                <input id='checkbox-menu' type='checkbox' className='checkbox-menu' checked={isChecked} onChange={handleCheckboxChange} />
            </label>
        </div>
        <div className={`div-menu ${isChecked ? 'div-menu-shifted' : ''}`} >
        <div className='barra-menu' >
            <button className='botonHome' onClick={()=> {navigate("/home"); handleCheckboxChange()}}>Discrepancia</button>
            <button className='botonLista' onClick={()=> {navigate("/lista"); handleCheckboxChange()}}>Lista</button>
            <button className='botonUpdate' onClick={()=> {navigate("/upload"); handleCheckboxChange()}}>Subir DB</button>
            <button className='botonValid' onClick={()=> {navigate("/InputDiscValPag"); handleCheckboxChange()}}>Validaciones</button>
            <button className='botonTabValid' onClick={()=> {navigate("/tableDiscValPag"); handleCheckboxChange()}}>Lista Disc</button>
            <button className='botonLogout' onClick={()=> SignOutUser()}>
                {user ? 'SignOut' : 'Log In'}
            </button>
        </div>
        </div>
        </>
    )
}