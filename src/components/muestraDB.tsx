import { client } from "../supabase/client";
import DataTable, { createTheme } from "react-data-table-component";
import './stylesheets/muestraDB.css'
// import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/table";
import { useQuery } from "@tanstack/react-query";
import Discrepancia from "../interfaces/Discrepancia";
import { useState, useEffect } from "react";


//-------Tema Tabla-------
createTheme('prueba', {
    text: {
        primary: 'black',
        secondary: '#2aa198',
    },
    background: {
        default: 'transparent',
    },
    }
);
//-------Funcion principal-------
export default function MuestraDB() {
//-------Solicitud a DB mediante useQuery(tanstack)-------
    const { data: dataDiscrepancias, isLoading, error } = useQuery<any>({
        queryFn: async () => await client.from('Discrepancia').select('*,RecepciónCarozo(*)'),//Union de 2 tablas
        queryKey: ['dataDiscrepancias'],
    });
    console.log(dataDiscrepancias?.data?.map((item: Discrepancia) => item.RecepciónCarozo));//mapeo data en cosola
//-------Filtro de busqueda-------
    const [filteredRecords, setFilteredRecords] = useState<Discrepancia[]>(dataDiscrepancias?.data);
    useEffect(() => {
        setFilteredRecords(dataDiscrepancias?.data);
    }, [dataDiscrepancias?.data]);//Cada vez que el [] se modifique, se actualizara en el VP.

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {//Reacciona al input text.
        const value = e.target.value.toLowerCase();
        const filtered = (dataDiscrepancias?.data || []).filter((record: any) =>{
            if (filterField === 'folio'){
                return record.folio.toLowerCase().includes(value);
            }else if (filterField === 'RecepciónCarozo.SDP'){
                return record.RecepciónCarozo.SDP?.toLowerCase().includes(value);
            }else if (filterField === 'RecepciónCarozo.CSG'){
                return record.RecepciónCarozo.CSG?.toLowerCase().includes(value);
            }
            return false
});
        setFilteredRecords(filtered);
    }
//-------Manejo de Select-------
    const [filterField, setFilterField] = useState<string>('folio');
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterField(e.target.value)
    }
    console.log(filterField)

//-------Componente expandible-------
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
        <input type="text" onChange={handleChange}></input>
        <select onChange={handleSelectChange}>
            <option value="folio">Folio</option>
            <option value="RecepciónCarozo.CSG">CSG</option>
            <option value="RecepciónCarozo.SDP">SDP</option>
        </select>
        <DataTable
            title="Discrepancias"
            theme="prueba"
            columns={[
                {name: 'Folio', sortable:true,selector:(row: Discrepancia) => row.folio},
                {name: 'Usuario',grow:2, sortable:true,selector:(row: Discrepancia) => row.user_name},
                {name: 'Discrepancia',grow:5,sortable:true, selector:(row: Discrepancia) => row.discrepancia},

                {name: 'Productor',grow:4, sortable:true,selector:(row: Discrepancia) => row.RecepciónCarozo.Nom_prod},
            ]}
            data={filteredRecords || []}
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