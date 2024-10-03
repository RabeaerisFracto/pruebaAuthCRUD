import { useState } from "react";
import { client } from "../supabase/client";



const [folio, setFolio] = useState("");
const [discrepancia, setDiscrepancia] = useState("");

function InputDiscValComp () {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { data: { user: nombreUsuario} } = await client.auth.getUser();
        try {
            const  { data, error } = await client.from('DiscrepanciaValidacion').insert([{
                Folio: folio,
                Discrepancia: discrepancia,
                UserName: (nombreUsuario?.user_metadata.full_name === null ? nombreUsuario?.email?.split("@")[0] : nombreUsuario?.user_metadata.full_name),
            }]);
            console.log(data, error);
        } catch (error) {
            console.log("error en CRUD "+ error);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Folio:
                    <input
                        type="text"
                        name="folio"
                        placeholder="Folio"
                        required
                        onChange={e=>setFolio(e.target.value)}/>
                </label>
                <label>
                    Discrepancia:
                    <input
                    type="text"
                    name="discrepancia"
                    placeholder="Discrepancia"
                    required
                    onChange={e=>setDiscrepancia(e.target.value)}/>
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default InputDiscValComp;