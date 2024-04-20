import { client } from "../supabase/client";
import { useState, useEffect } from "react";



export default function MuestraDB() {
    const [discrepancias, setDiscrepancias] = useState<any>(null);


    useEffect(() => {
        async function fetchTable () {
            const discrepancias = await client.from('discrepancias').select('*');
            setDiscrepancias(discrepancias);

        }
        fetchTable();
    },[]);
return(
    <>
    <div>
        {}
    </div>
    </>
)
    }