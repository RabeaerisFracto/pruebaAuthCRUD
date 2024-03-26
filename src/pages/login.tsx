import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { client } from "../supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

function Login (){
    const navigate = useNavigate();
    useEffect(()=>{
        client.auth. onAuthStateChange(async (event)=>{
        if (event === "SIGNED_IN") {
            //Osea usuario logeado, redirigir a SU pagina de inicio
            navigate("/home")
        } else {
            //Redirigir a la pagina de login o signup
            navigate("/login")
        }
    })
}, [navigate])
    return(
        <div className="Login">
            <header className="Login-header">
                <Auth 
                supabaseClient={client}
                providers={["discord","google"]}
                theme="dark"
                appearance={{theme: ThemeSupa}}/>
            </header>
        </div> 
    )
}

export default Login;