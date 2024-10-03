import { useState } from "react";
import { client } from "../supabase/client";
import "../components/stylesheets/inputDiscValComp.css";


function InputDiscValComp () {
    const [nFolio, setnFolio] = useState("");
    const [discrepancia, setDiscrepancia] = useState("");
    const [selectValue, setSelectValue] = useState("G");
    const folio = selectValue + nFolio;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { data: { user: nombreUsuario} } = await client.auth.getUser();
        try {
            const  { data, error } = await client.from('DiscrepanciaValidacion').insert([{
                Folio: folio,
                Discrepancia: discrepancia,
                UserID: nombreUsuario?.id,
                UserName: (nombreUsuario?.user_metadata.full_name === null ? nombreUsuario?.email?.split("@")[0] : nombreUsuario?.user_metadata.full_name),
            }]);
            console.log(data, error);
            console.log(nFolio + " " + discrepancia);
        } catch (error) {
            console.log("error en CRUD "+ error);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label className="label">
                    <select 
                        onChange={e => setSelectValue(e.target.value)}>
                        <option value="G">G</option>
                        <option value="L">L</option>
                        <option value="H">H</option>
                        <option value="C">C</option>
                    </select>
                    <input
                        type="text"
                        name="folio"
                        placeholder="Numero de folio"
                        required
                        onChange={e=>setnFolio(e.target.value)}/>
                </label>
                <label>
                    <input
                    type="text"
                    name="discrepancia"
                    placeholder="Discrepancia y observaciones"
                    required
                    onChange={e=>setDiscrepancia(e.target.value)}/>
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default InputDiscValComp;