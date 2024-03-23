import { useState } from "react";
import { client } from "../supabase/client";


function Signup(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        // const { user, session, error } = await client.auth.signUp({});
        try{
        await client.auth.signUp({email, password});
        console.log(email+" "+password);
        console.log(Response);
        console.log("Usuario registrado");
        } catch (error){
            console.log(Error + "error aqui");
        }
    }

    return (
        <div>
            <h1>Signup</h1>
            <form onSubmit={handleSubmit}>
                <input
                type="email"
                name="email"
                placeholder="mail aca"
                onChange={e=>setEmail(e.target.value)}/>
                <input
                type="password"
                name="password"
                placeholder="clave aca"
                onChange={e=>setPassword(e.target.value)}
                />
                <button>Registrarse</button>
            </form>
        </div>
    )
}

export default Signup;