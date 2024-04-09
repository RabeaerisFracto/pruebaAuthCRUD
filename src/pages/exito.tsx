// import { Auth } from "@supabase/auth-ui-react";
// import { ThemeSupa } from "@supabase/auth-ui-shared";
import { client } from "../supabase/client";
import { useNavigate } from "react-router-dom";
import {useEffect, useState} from "react";

function Exito(){
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

//--------------OBTENCION DE DATA DE USUARIO LOGUEADO-------------------

    useEffect(()=>{
        async function getUserData(){// Tiene que ser con async
            const { data:{user:dataUsuario}, error } = await client.auth.getUser();
            // entre {} para desestructurar el objeto, separado por como para considerar los 2 objetos dentro de "data".
            if (error) {
                console.log('Error obteniendo usuario:', error.message);
            } else if (dataUsuario) { // Usando nombre de variable dataUsuario para no confundir con user
                setUser(dataUsuario);
                if(dataUsuario?.email){setEmail(dataUsuario?.email);} // con condicional para evitar error en consola
                console.log(dataUsuario?.email); // para confirmar mail x consola.
                console.log(user);
            }}
        getUserData();// Se llama a la función para que se ejecute
    },[]);



    async function signOutUser(){
        const { error } = await client.auth.signOut();
        if (error) {console.log('Error al desconectar:', error.message)}
        else{
            navigate("/login");
            console.log('Desconectado')}
    }
    return(
        <div>
            {Object.keys(user).length !== 0 ?
            <>
            <h1>¡Bienvenido {email.split("@")[0]}!</h1>
            <h2>Has iniciado sesión correctamente</h2>
            <button onClick={()=> signOutUser()}>SignOut</button>
            </>
            :
            <>
            <h1>¡Ups! Usuario no logueado</h1>
            <button onClick={()=> navigate("/login")}>Login</button>
            </>
            }
        </div>
    )
}
export default Exito;