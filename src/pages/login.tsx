import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { client } from "../supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

function Login (){
    const navigate = useNavigate();
    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await client.auth.getSession();
            if (session) {
                navigate("/exito");
            } else {
                client.auth.onAuthStateChange((event) => {
                    if (event === "SIGNED_IN") {
                        navigate("/exito");
                    } else {
                        navigate("/login");
                    }
                });
            }
        }
        checkSession();
    }, [navigate]);
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