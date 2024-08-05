import { client } from "../supabase/client";
import DataTable, { createTheme } from "react-data-table-component";
import './stylesheets/muestraDB.css'
// import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/table";
import { useQuery } from "@tanstack/react-query";
import { IData } from "./dropzone";

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
    RecepciónCarozo: IData;
    folio: string;
    discrepancia: string;
    user_name: string;
    Bins: number;
}



export default function MuestraDB() {


    const { data: dataDiscrepancias, isLoading, error } = useQuery<any>({
        queryFn: async () => await client.from('Discrepancia').select('*,RecepciónCarozo(*)'),
        queryKey: ['dataDiscrepancias'],
    });
console.log(dataDiscrepancias?.data?.map((item: Discrepancia) => item.RecepciónCarozo));
    const ExpandableComponent: React.FC<{ data: Discrepancia }> = ({ data }) => (
        <div className="expandable-component">
            <p><strong>Productor:</strong> {data.RecepciónCarozo.Cprod}  {data.RecepciónCarozo.Nom_prod} </p>
            <p><strong>CSG:</strong> {data.RecepciónCarozo.CSG}</p>
            <p><strong>SDP:</strong> {data.RecepciónCarozo.SDP}</p>
            <p><strong>Bins:</strong> {data.RecepciónCarozo.Bins}</p>
            <p><strong>Fecha de Recepción:</strong> {data.RecepciónCarozo.FecRecepcion}</p>
            <p><strong>Folio:</strong> {data.RecepciónCarozo.Folio}</p>
            <p><strong>Kilos Totales:</strong> {data.RecepciónCarozo.KilosFolio}</p>
            <p><strong>Kilos Promedio:</strong> {data.RecepciónCarozo.Kilos_prom}</p>
            <p><strong>Fecha de Peso:</strong> {data.RecepciónCarozo.FecPeso}</p>
        </div>
    );
    if (isLoading) return <div>Cargando data...</div>;
    if (error) return <div>Error de carga de data</div>;

return(
    <div className="tabla">
        <DataTable
            title="Discrepancias"
            theme="prueba"
            columns={[
                {name: 'Folio', sortable:true,selector:(row: Discrepancia) => row.folio},
                {name: 'Usuario',grow:2, sortable:true,selector:(row: Discrepancia) => row.user_name},
                {name: 'Discrepancia',grow:5,sortable:true, selector:(row: Discrepancia) => row.discrepancia},

                {name: 'Productor',grow:4, sortable:true,selector:(row: Discrepancia) => row.RecepciónCarozo.Nom_prod},
            ]}
            data={dataDiscrepancias?.data || []}
            pagination
            // paginationPerPage={4}
            fixedHeader
            progressPending={isLoading}
            expandableRows
            expandableRowsComponent={ExpandableComponent}
            expandOnRowClicked
            expandableRowsHideExpander
        />
    </div>
)
    }