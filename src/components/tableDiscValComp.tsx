import { client } from "../supabase/client";
import DataTable, { createTheme } from "react-data-table-component";
import { useQuery } from "@tanstack/react-query";
// import { useState, useEffect } from "react";
import DiscValidacion from "../interfaces/DiscValidacion";
import './stylesheets/tableDiscValComp.css';

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useState } from "react";

//-------Tema Tabla-------
createTheme('prueba', {
    text: {
        primary: '#666',
        secondary: '#2aa198',
    },
    background: {
        default: 'transparent',
    },
    }
);

//-------Funcion principal-------
export default function TableDiscValComp() {
    //-------Solicitud a DB mediante useQuery(tanstack)-------
    const { data: dataDiscrepancias, isLoading, error } = useQuery<any>({
        queryFn: async () => await client.from('DiscrepanciaValidacion').select('*'),
        queryKey: ['dataDiscrepancias'],
    });
    if (error) {console.log("error en la tabla "+ error);}
    console.log(dataDiscrepancias?.data?.map((item: DiscValidacion) => item.Folio));//mapeo data en consola

//-------Componente expandible-------
const [isLoadingX, setIsLoadingX] = useState(true);
function skeletonX() {
    setIsLoadingX(false);
    console.log("Imagen Cargada");
}
const ExpandableComponent: React.FC<{ data: DiscValidacion }> = ({ data }) => (
    <div className="expandable-component">
        <div className="infoDisc">
            <div><strong>Fecha de Recepción:</strong> {data.created_at.toString().replace("T", " ").slice(0,19)}</div>
            <div><strong>Folio:</strong> {data.Folio}</div>
            <div><strong>Discrepancia:</strong> {data.Discrepancia}</div>
        </div>
        <div className="fotoDisc" >
            <div className="IMGContainer">
                {isLoadingX && <Skeleton enableAnimation direction="ltr" duration={0.3} height={300} width={300} />}
                    <img
                        src={imgfolio(data.Folio).data.publicUrl}
                        loading="lazy"
                        style={{ width: '15vw', minWidth: '230px', maxWidth: '300px' }}
                        onLoad={skeletonX}
                    />
            </div>
        </div>
    </div>
);
//-------Funcion para obtener URL de imagen-------
const imgfolio = (NF: string) => client.storage
    .from('fotosDiscrepancia')
    .getPublicUrl(`fotos/${NF}`);

    
    return (
        <div className="tablaDiscrepancia">
        <DataTable
            title="Discrepancias"
            theme="prueba"
            columns={[
                {name: 'Folio', sortable:true,selector:(row: DiscValidacion) => row.Folio},
                {name: 'Usuario',grow:2, sortable:true,selector:(row: DiscValidacion) => row.UserName},
                {name: 'Discrepancia',grow:5,sortable:true, selector:(row: DiscValidacion) => row.Discrepancia},
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
