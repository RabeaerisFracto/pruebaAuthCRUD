import { client } from "../supabase/client";
import DataTable, { createTheme } from "react-data-table-component";
import { useQuery } from "@tanstack/react-query";
// import { useState, useEffect } from "react";
import DiscValidacion from "../interfaces/DiscValidacion";
import './stylesheets/tableDiscValComp.css';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useEffect, useState } from "react";

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


//-------Renderizado de columnas mobile-------
const [isMobile, setIsMobile] = useState(window.innerWidth < 500);//useState 'thruthy' si es menor a 500px
useEffect(()=>{
    const handleResize = () =>{setIsMobile(window.innerWidth < 500)};
    window.addEventListener('resize', handleResize);//escucha evento resize, se ser asi, se aplica setIsMobile
    //Al aplicarse, use state verifica si estado es o no true.
    return () => {window.removeEventListener('resize', handleResize)};
    //Return para limpiar evento (removeEvent) al desmontar componente, verifica nuevamente pxs, evita memory leak.
},[]);

const textWrapStyleDesktop: React.CSSProperties = {whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'left', width: '45em'};

const textWrapStyleResponsive: React.CSSProperties = {whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'left', width: '15em'};
//Estilo en una constante para mayor orden en jsx.
//Las 2 1eras para wraping de texto cuando tamaño de vp disminuye, 3era para alinear a izq nueva celda.

//--------------------Conseguir id de fila expandida--------------------
const [expandedRow, setExpandedRow] = useState<string | null>(null);
//Ultimo row.id que se expandió.
const handleExpandedRowToggle = (expanded:Boolean, row: DiscValidacion) => {
    //expanded no lo estamos usando ahora, pero con console.log evito advertencia x retorno de onRowExpandToggled
    //podria ser solo row, pero onRowExpandToggled retorna 2, si los acepto, debo recibirlos en esta funcion
    setExpandedRow((rowAnterior) => (rowAnterior === row.id ? null : row.id))
    //Si row.id que envia el toggle en jsx es igual a rowAnterior, se cierra, sino se expande.
    //setExpandedRow((valor anterior de seteo)=>(condicion ? null si true : si false se aplica seteo a nuevo row.id))
    console.log(expanded, row);
    //console.log para evitar advertencia de retorno de onRowExpandToggled
}

//--------------------Skeleton--------------------
const [isLoadingX, setIsLoadingX] = useState(true);
function skeletonX() {
    setIsLoadingX(false);
    console.log("Imagen Cargada");
}
//--------------------No Display IMG--------------------
const [noDisplayIMG, setNoDisplayIMG] = useState<boolean>(true);
const handleNoDisplayIMG = (data:DiscValidacion) => {
    setNoDisplayIMG(!noDisplayIMG);
    setCerrarIMG(!cerrarIMG);
    setUrlActual(imgfolio(data.Folio).data.publicUrl)
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
const [cerrarIMG, setCerrarIMG] = useState<boolean>(true);
const uncheckedIMG = () => {
    setCerrarIMG(!cerrarIMG);
    console.log("Imagen Cerrada");
}

//-------Componente expandible-------
const [urlActual, setUrlActual] = useState<string>('');
const ExpandableComponent: React.FC<{ data: DiscValidacion }> = ({ data }) => (
    <div className="expandable-component">
        <div className="infoDisc">
            <div><strong>Fecha de Recepción:</strong> {data.created_at.toString().replace("T", " ").slice(0,19)}</div>
            <div><strong>Folio:</strong> {data.Folio}</div>
            <div><strong>Especie:</strong>{data.Especie}</div>
            <div><strong>Discrepancia:</strong> {data.Discrepancia}</div>
            <div><strong>Usuario:</strong> {data.UserName}</div>
        </div>
        <div className="fotoDisc" >
            <div className="IMGContainer">
            <input type="checkbox" id="checkIMG" onChange={() => handleNoDisplayIMG(data)} />
                {isLoadingX && <SkeletonTheme><Skeleton enableAnimation direction="ltr" duration={0.3} height={300} width={300}/></SkeletonTheme>}
                <label htmlFor='checkIMG' className={noDisplayIMG ? "lnoLabel" : "labelFoto"}>
                    <div className="fotoChica">
                        <img
                            style={{ overflowX: 'visible' }}
                            src={imgfolio(data.Folio).data.publicUrl}
                            alt="Presiona para agrandar imagen"
                            loading="lazy"
                            onLoad={skeletonX}
                        />
                    </div>
                </label>
            </div>
        </div>
    </div>
);

//-------Funcion para obtener URL de imagen-------
const imgfolio = (NF: string) => client.storage
    .from('fotosDiscrepancia')
    .getPublicUrl(`fotos/${NF}`);


//------------------Buscador------------------
const [elementosFiltrados, setElementosFiltrados] = useState<DiscValidacion[]>(dataDiscrepancias?.data || []);
useEffect(() => {
    setElementosFiltrados(dataDiscrepancias?.data);
}, [(dataDiscrepancias?.data)]);

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    const filtrado = (dataDiscrepancias?.data || []).filter((record: DiscValidacion) => {
        if (campoFiltrado === 'folio') {
            return record.Folio.toLowerCase().includes(value);
        } else if (campoFiltrado === 'Usuario') {
            return record.UserName.toLowerCase().includes(value);
        }
        return false
    });
    setElementosFiltrados(filtrado);
}

const [campoFiltrado, setCampoFiltrado] = useState<string>('folio');
const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCampoFiltrado(e.target.value)
}
console.log(campoFiltrado)
    
if (isLoading) return <div><Skeleton  direction="ltr" duration={0.6} count={5} width={"650px"} /></div>;
//EARLY RETURN AL FINAL, asi se evita error de hooks despues de un render condicional.

//--------------Renderizado de Tabla-----------------
    return (
        <div className="tablaDiscrepancia">
            <input type="text" placeholder={`Busca por ${campoFiltrado === 'folio' ? 'Folio' : 'Usuario'}`} onChange={handleChange}></input><select onChange={handleSelectChange}>
                <option value="folio">Folio</option>
                <option value="Usuario">Usuario</option>
            </select>
        <DataTable
            theme="prueba"
            title="Discrepancias"
            columns={[
                {name: 'Folio',grow:1, sortable:true,selector:(row: DiscValidacion) => row.Folio},
                {name: 'Usuario',grow:2, sortable:true,selector:(row: DiscValidacion) => row.UserName, cell: (row:DiscValidacion) => <div className={isMobile ? 'ocultar-columna' : ''}>{row.UserName}</div>, omit: isMobile},
                {name: 'Discrepancia',grow:7,sortable:true, maxWidth: '60em',selector:(row: DiscValidacion) => row.Discrepancia,cell: (row: DiscValidacion) => (
                    <div data-tag="allowRowEvents" style={window.innerWidth < 500 ? textWrapStyleResponsive : textWrapStyleDesktop}>
                        {/* data-tag permite interaccion con nueva celda, style aplica css a nueva celda */}
                        {row.Discrepancia}
                    </div>)},
            ]}
            data={elementosFiltrados || []}
            pagination
            paginationPerPage={6}
            fixedHeader
            progressPending={isLoading}
            expandableRows
            expandableRowsComponent={ExpandableComponent}
            expandableRowExpanded={(row)=> row.id === expandedRow}
            //compara id con ultima fila expandida, si false, no se expande.
            onRowExpandToggled={(expanded, row) => handleExpandedRowToggle(expanded, row)}
            //(expandido?, si true = numero id, si false = no se ejecuta handleExpandedRowToggle)
            expandOnRowClicked
            expandableRowsHideExpander
        />
        <input type="checkbox" id="uncheckIMG" onChange={uncheckedIMG}></input>
        <label htmlFor="uncheckIMG" className={!cerrarIMG ? 'labelGrande' : 'labelNoDisplay'}>
        <div className="fotoGrande">
            <img
                src={urlActual}
                alt="Foto de Discrepancia"
                loading="lazy"
                onLoad={skeletonX}
                            />
        </div>
        </label>
        </div>     
    )
}
