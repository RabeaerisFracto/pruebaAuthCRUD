// import { Auth } from "@supabase/auth-ui-react";
// import { ThemeSupa } from "@supabase/auth-ui-shared";
import { client } from "../supabase/client";
import { useNavigate } from "react-router-dom";
import {useEffect, useState} from "react";
import { UserContext } from "../context/UserContext";
import useUserStore from "../store/userDataStore";
// import DataOnScreen from "../components/dataOnScreen.tsx";
import '../pages/stylesheets/pags.css'


function Exito(){
    const [user, setUser] = useState(undefined);
    const navigate = useNavigate();
    const [email, setEmail] = useState<string | undefined>('');
    const userStore = useUserStore((state) => state.user);
    const [globalname, setGlobalname] = useState('Buscando nombre...' as string | undefined);

    useEffect(() => {
        if (userStore == null || userStore == undefined) { return }
        else {
            setGlobalname(userStore.user_metadata.full_name)
        }
    }, [userStore])
//--------------OBTENCION DE DATA DE USUARIO LOGUEADO-------------------

    useEffect(()=>{
        async function getUserData(){// Tiene que ser con async
            const { data:{user:dataUsuario}, error } = await client.auth.getUser() as any;
            // entre {} para desestructurar el objeto, separado por como para considerar los 2 objetos dentro de "data".
            if (error) {
                console.log('Error obteniendo usuario:', error.message);
            } else if (dataUsuario) { // Usando nombre de variable dataUsuario para no confundir con user
                setUser(dataUsuario);
                if(dataUsuario?.email){setEmail(dataUsuario?.email);} // con condicional para evitar error en consola
                console.log(dataUsuario?.email); // para confirmar mail x consola.
            }}
        getUserData();// Se llama a la función para que se ejecute
        console.log(user); //se tiene ue ejecutar la funcion primero

    },[]);





    async function signOutUser(){
        const { error } = await client.auth.signOut();
        if (error) {console.log('Error al desconectar:', error.message)}
        else{
            navigate("/login");
            console.log('Desconectado')}
    }
    //  crear nuevo comonente dentro de return para probar si se pasa info.
    //  llamar info dentro de este mismo return
    return(
        <div className="bienvenida">
            <UserContext.Provider value={user}>
            {user && Object.keys(user).length !== 0 && typeof email === 'string' ?
            <>
            <h1>¡Bienvenido {globalname ? globalname?.charAt(0).toUpperCase() + globalname?.slice(1) : email.split("@")[0]}!</h1>
            <h2>Has iniciado sesión correctamente</h2>
            <button onClick={()=> signOutUser()}>SignOut</button>
            </>
            :
            <>
            <h1>¡Ups! Usuario no logueado</h1>
            <button onClick={()=> navigate("/login")}>Login</button>
            </>
            }
            {/* <DataOnScreen/> */}
            </UserContext.Provider>
        </div>
    )
}
export default Exito;