import { client } from "../supabase/client";
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();


async function SignOutUser(){
    const { error } = await client.auth.signOut();
    if (error) {console.log('Error al desconectar:', error.message)}
    else{
        navigate("/login");
        console.log('Desconectado')}

return(
    <div>
        <button onClick={()=> SignOutUser()}>SignOut</button>
    </div>
)
}
export default SignOutUser;