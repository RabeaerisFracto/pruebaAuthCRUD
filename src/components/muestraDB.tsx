import { client } from "../supabase/client";
import { useState, useEffect } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import './stylesheets/muestraDB.css'
// import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/table";

createTheme('prueba', {
    text: {
        primary: 'black',
        secondary: '#2aa198',
    },
    background: {
        default: 'transparent',
    },
    }
)
interface Discrepancia {
    RecepciónCarozo: any;
    folio: string;
    discrepancia: string;
    user_name: string;
    Bins: number;
}


export default function MuestraDB() {
    const [discrepancias, setDiscrepancias] = useState<any>(null);
    useEffect(() => {
        async function fetchDiscrepancias() {;
        const { data, error } = await client.from('Discrepancia')
        .select('*,RecepciónCarozo(*)');
        if (error) console.log('error', error);
        else setDiscrepancias(data);
        }
        fetchDiscrepancias();
    },[]);
return(
    <>
    <div className="tabla">
        <DataTable
            title="Discrepancias"
            theme="prueba"
            columns={[
                {name: 'Folio', sortable:true,selector:(row: Discrepancia) => row.folio},
                {name: 'Usuario',grow:2, sortable:true,selector:(row: Discrepancia) => row.user_name},
                {name: 'Discrepancia',grow:5,sortable:true, selector:(row: Discrepancia) => row.discrepancia},
                {name: 'Bins', sortable:true,selector:(row: Discrepancia) => row.RecepciónCarozo && row.RecepciónCarozo.Bins},
                {name: 'SDP', sortable:true,selector:(row: Discrepancia) => row.RecepciónCarozo && row.RecepciónCarozo.SDP},
                {name: 'Productor',grow:4, sortable:true,selector:(row: Discrepancia) => row.RecepciónCarozo && row.RecepciónCarozo.Nom_prod},
            ]}
            data={discrepancias || []}
        />
    </div>
    </>
)
    }