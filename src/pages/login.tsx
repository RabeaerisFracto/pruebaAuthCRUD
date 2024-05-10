import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { client } from "../supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

function Login (){
    const navigate = useNavigate();
    useEffect(() => {
        const checkSession = async () => {
            client.auth.onAuthStateChange(async (event) => {
                if(event === "SIGNED_IN") navigate("/");
            });
        };
        checkSession();   
    }, [navigate]);
    return(
        <div className="Login">
            <header className="Login-header">
                <Auth 
                supabaseClient={client}
                providers={["discord","google","twitch"]}
                theme="dark"
                redirectTo="http://localhost:5173/exito"
                localization={{
                    variables:{
                    sign_in:{
                        email_label:'Correo electrónico',
                        password_label:'Contraseña',
                        email_input_placeholder:'Ingresa tu correo electrónico',
                        password_input_placeholder:'Ingresa tu contraseña',
                        link_text:'¿No tienes cuenta? Inscribete!',
                        social_provider_text:'Tienes cuenta {{provider}}?',
                    },
                    forgotten_password:{
                        link_text:'¿Olvidaste tu contraseña?',
                        confirmation_text:'No te preocupes, te enviaremos un correo para que puedas recuperarla',
                        email_label:'Enviar correo',
                        email_input_placeholder:'Ingresa tu correo electrónico',
                    },
                }
                }}
                appearance={{theme: ThemeSupa}}/>
            </header>
        </div> 
    )
}

export default Login;