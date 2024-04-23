import { useNavigate } from "react-router-dom";
import { client } from "../supabase/client";
import '../components/stylesheets/menu.css'



export default function Menu() {

const navigate = useNavigate();

async function SignOutUser(){
    const { error } = await client.auth.signOut();
    if (error) {console.log('Error al desconectar:', error.message)}
    else{
        navigate("/login");
        console.log('Desconectado')}
    }

    return (
        <>
        <div className='barra-menu' >
            <button className='botonHome' onClick={()=> navigate("/home")}>Discrepancia</button>
            <button className='botonLista' onClick={()=> navigate("/lista")}>Lista</button>
            <button className='botonLogout' onClick={()=> SignOutUser()}>SignOut</button>
        </div>
        </>
    )
}