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
    // const [provider, setProvider] = useState('' as string | undefined);
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
            // setProvider(user.app_metadata.provider)
            setAvatar(user.user_metadata.avatar_url)
        }
    }, [user, EsquinaUsuario, SignOutUser]);


    //--------------Log Out-------------------
    async function SignOutUser(){
        const { error } = await client.auth.signOut();
        if (error) {console.log('Error al desconectar:', error.message)}
        else{
            navigate("/login");
            setGlobalname(undefined)
            setEmail(undefined)
            // setProvider(undefined)
            setAvatar(undefined);
            window.location.reload();
            console.log('Desconectado')}
        }
            //--------------Colapsar menu contextual-------------------
    const [isChecked, setIsChecked] = useState(true);
    function handleCheckboxChange() {//Como funcion tradicional para facilitar llamado en JSX
        setIsChecked(!isChecked);
        if (isChecked) {
            setNoDisplayGranel(true);
            setNoDisplayValidaciones(true);
        }
    };
        const [noDisplayGranel, setNoDisplayGranel] = useState(true);
        const handleMenuDesplegableGranel = () => {
            setNoDisplayGranel(!noDisplayGranel);
        }
        const [noDisplayValidaciones, setNoDisplayValidaciones] = useState(true);
        const handleMenuDesplegableValidaciones = () => {
            setNoDisplayValidaciones(!noDisplayValidaciones);
        }

    return (
        <>
        <Outlet/>
        {/* Se ubica Outlet antes del resto del codigo para que Layout quede por sobre pagina ruteada */}
        <div className='esquina-usuario'>
            <label className='label-menu' htmlFor='checkbox-menu'>
                {user ?
                <>
                <h1>{email}<br/>
                    {globalname ? globalname?.charAt(0).toUpperCase() + globalname?.slice(1) : ''}
                    {/* {provider ? provider.charAt(0).toUpperCase() + provider.slice(1) : ''} */}
                    </h1>
                    <img src={avatar} alt='' />
                </>
                : <button className='login' onClick={() => navigate("/login")}>LogIn</button>}
                
                <input id='checkbox-menu' type='checkbox' className='checkbox-menu' checked={isChecked} onChange={handleCheckboxChange} />
            </label>
        </div>
        <div className={`div-menu ${isChecked ? 'div-menu-shifted' : ''}`} >
        <div className='barra-menu' >
            <div className='divBotonGranel'>
                <button className='botonGranel' onClick={handleMenuDesplegableGranel}>
                    Granel
                </button>
            </div>
            <div className={noDisplayGranel ? 'noDisplay' : 'desplegableGranel'}>
                <button className='botonHome' onClick={()=> {navigate("/home"); handleCheckboxChange(); setNoDisplayGranel(true)}}>→ Discrepancia</button>
                <button className='botonLista' onClick={()=> {navigate("/lista"); handleCheckboxChange(); setNoDisplayGranel(true)}}>→ Lista</button>
                <button className='botonUpdate' onClick={()=> {navigate("/upload"); handleCheckboxChange(); setNoDisplayGranel(true)}}>→ Subir DB</button>
            </div>
            <div className='divBotonValidaciones'>
                <button className='botonValidaciones' onClick={handleMenuDesplegableValidaciones}>
                    Validaciones
                </button>
            </div>
            <div className={noDisplayValidaciones ? 'noDisplay' : 'desplegableValidaciones'}>
                <button className='botonIngValid' onClick={()=> {navigate("/InputDiscValPag"); handleCheckboxChange(); setNoDisplayValidaciones(true)}}>→ Ingreso</button>
                <button className='botonTabValid' onClick={()=> {navigate("/tableDiscValPag"); handleCheckboxChange(); setNoDisplayValidaciones(true)}}>→ Tabla</button>
            </div>
            <button className='botonLogout' onClick={()=> SignOutUser()}>
                {user ? 'SignOut' : 'Log In'}
            </button>
        </div>
        </div>
        </>
    )
}