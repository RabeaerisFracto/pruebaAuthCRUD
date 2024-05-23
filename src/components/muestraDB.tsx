import { client } from "../supabase/client";
import DataTable, { createTheme } from "react-data-table-component";
import './stylesheets/muestraDB.css'
// import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/table";
import { useQuery } from "@tanstack/react-query";

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


    const { data: dataDiscrepancias, isLoading, error } = useQuery({
        queryFn: () => client.from('Discrepancia').select('*,RecepciónCarozo(*)'),
        queryKey: ['dataDiscrepancias'],
    });
    console.log(dataDiscrepancias);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error de carga de data</div>;



    // useEffect(() => {
    //     async function fetchDiscrepancias() {;
    //     const { data, error } = await client.from('Discrepancia')
    //     .select('*,RecepciónCarozo(*)');
    //     if (error) console.log('error', error);
    //     else setDiscrepancias(data);
    //     }
    //     fetchDiscrepancias();
    // },[]);
return(
    <>

    </>
)
    }