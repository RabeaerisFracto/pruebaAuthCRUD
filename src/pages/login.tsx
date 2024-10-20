import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { client } from "../supabase/client";


function Login (){

    async function verificarToken() {
            client.auth.onAuthStateChange((event) => {
                console.log('Cambio de estado de autenticación', event);
                if ( event === 'SIGNED_IN' ) {
                    console.log('Usuario autenticado');
                    window.location.assign("http://localhost:5173/exito")
                    //Se hace mediante JS nativo, para que no se renderice el componente Auth de nuevo.
                    //Comentar assign para confirmar x consola seguridad de clave de usuario.
            }else{
            console.log('No hay token');
        }
    })};
verificarToken();

    return(
        <div className="Login">
            <header className="Login-header">
                <Auth 
                supabaseClient={client}
                providers={["discord","google","twitch","azure"]}
                theme="dark"
                redirectTo="http://localhost:5173/exito"
                queryParams={{
                    access_type: 'offline',
                    next: '/exito',
                    redirectTo: '/exito'}}
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