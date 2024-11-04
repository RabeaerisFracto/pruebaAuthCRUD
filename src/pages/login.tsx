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
                        link_text:'¿Ya estas registrado? Ingresa acá',
                        social_provider_text:'Tienes cuenta {{provider}}?',
                        button_label:'Iniciar sesión',
                    },
                    sign_up: {
                        email_label: "Dirección de correo electrónico",
                        password_label: "Crear contraseña",
                        email_input_placeholder: "Tu dirección de correo electrónico",
                        password_input_placeholder: "Tu contraseña",
                        button_label: "Registrarse",
                        loading_button_label: "Registrando...",
                        social_provider_text: "Iniciar sesión con {{provider}}",
                        link_text: "¿No tienes una cuenta? Regístrate"
                    },
                    forgotten_password: {
                        email_label: "Dirección de correo electrónico",
                        password_label: "Tu contraseña",
                        email_input_placeholder: "Tu dirección de correo electrónico",
                        button_label: "Enviar instrucciones para restablecer la contraseña",
                        loading_button_label: "Enviando instrucciones...",
                        link_text: "¿Olvidaste tu contraseña?"
                },
                update_password: {
                    password_label: "Nueva contraseña",
                    password_input_placeholder: "Tu nueva contraseña",
                    button_label: "Actualizar contraseña",
                    loading_button_label: "Actualizando contraseña..."
                },
                }
                }}
                appearance={{theme: ThemeSupa}}/>
            </header>
        </div> 
    )
}

export default Login;