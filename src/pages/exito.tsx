// import { Auth } from "@supabase/auth-ui-react";
// import { ThemeSupa } from "@supabase/auth-ui-shared";
import { client } from "../supabase/client";
import { useNavigate } from "react-router-dom";
import {useEffect, useState} from "react";

function Exito(){
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(()=>{
        async function getUserData(){
            await client.auth.getUser().then((value)=>{
                if(value.data?.user){
                    setUser(value.data.user)
                    console.log(value.data.user)
                    console.log(user)
                }
            })}
        getUserData();
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
            <h1>¡Bienvenido!</h1>
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