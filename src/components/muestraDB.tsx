import { client } from "../supabase/client";
import DataTable, { createTheme } from "react-data-table-component";
import './stylesheets/muestraDB.css'
// import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/table";
import { useQuery } from "@tanstack/react-query";
import Discrepancia from "../interfaces/Discrepancia";
import { useState, useEffect } from "react";

import { json2csv } from "json-2-csv";
import { saveAs } from "file-saver";


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
export default function MuestraDB() {
//-------Renderizado de comumnas-------
//Como cambia lo renderizado (presencia o ausencia de columnas), hay que hacerlo de lo primero en la funcion.
const [isMobile, setIsMobile] = useState(window.innerWidth < 500);
useEffect(()=>{
    const handleResize = () =>{setIsMobile(window.innerWidth < 500)};
    window.addEventListener('resize', handleResize);
    return () => {window.removeEventListener('resize', handleResize)};
},[]);
//-------Solicitud a DB mediante useQuery(tanstack)-------
    const { data: dataDiscrepancias, isLoading, error } = useQuery<any>({
        queryFn: async () => await client.from('Discrepancia').select('*,RecepciónCarozo(*)'),//Union de 2 tablas
        queryKey: ['dataDiscrepancias'],
    });
    // console.log(dataDiscrepancias?.data?.map((item: Discrepancia) => item.RecepciónCarozo));//mapeo data en consola
//-------Guardar fecha en useState-------
    const [fechaSeleccionada, setFechaSeleccionada] = useState<string | null>(null);
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFechaSeleccionada(e.target.value); // Value es la fecha seleccionada.
    }

    //-------Manejo de Select-------
    const [filterField, setFilterField] = useState<string>('folio');
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterField(e.target.value)
    }
////////////////-------Filtro de busqueda-------
    const [filteredRecords, setFilteredRecords] = useState<Discrepancia[]>(dataDiscrepancias?.data);
    useEffect(() => {
        setFilteredRecords(dataDiscrepancias?.data);//Cuando se actualice  el query, se actualiza el filtro.
        handleDateChange; //Para que se actualice la fecha del state
        console.log(fechaSeleccionada)
    }, [dataDiscrepancias?.data, fechaSeleccionada]);//Cada vez que el [] se modifique, se actualizara en el VP.
//--------------------Actualizar tabla solo con fecha seleccionada--------------------
    const [searchValue, setSearchValue] = useState(''); // Se almacena value de input en handleChange
    const [jsonExport, setJsonExport] = useState<any>([]); // Se almacena value de input en handleChange
    useEffect(() => {//Mismo codigo de handleChange pero en useEffect
        const filtered = (dataDiscrepancias?.data || []).filter((record: any) => {
            const matchesFilterField = filterField === 'folio'
                ? record.folio.toLowerCase().includes(searchValue)
                : filterField === 'RecepciónCarozo.SDP'
                ? record.RecepciónCarozo.SDP?.toLowerCase().includes(searchValue)
                : filterField === 'RecepciónCarozo.CSG'
                ? record.RecepciónCarozo.CSG?.toLowerCase().includes(searchValue)
                : false;
            const matchesDate = fechaSeleccionada ? record.RecepciónCarozo.FecRecepcion.includes(fechaSeleccionada) : true;
            return matchesFilterField && matchesDate;
        });
        setFilteredRecords(filtered);
        const jsonData = JSON.stringify(filtered, null, 2);
        setJsonExport(jsonData);
        console.log(jsonData);
    }, [fechaSeleccionada, dataDiscrepancias?.data, filterField, searchValue]); // Se actualiza cada vez que cambie la fecha y searchValue

    //-------Descargar CSV-------

    const export2CVS = () => {
        const blobcsv = new Blob([json2csv(JSON.parse(jsonExport))], { type: 'text/csv' });
        saveAs(blobcsv, 'discrepancias.txt');
        // Se crea funcion que será utilizada en onClick, new blob (data, {type: 'text/csv'}), saveAs(blob, 'nombre.csv')
        // Data usa libreria que convierte a cvs, parseando el jsonExport antes.
        // Segundo parametro es tipo de blob, en este caso texto/csv.
        // saveAs(nombre de const de blob, 'nombre-con-el-que-quedara-el-archivo.cvs') guarda el archivo con el nombre.
    };

    //---------------------handleChange--------------------
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {//Reacciona al input text.
        const value = e.target.value.toLowerCase();
        setSearchValue(value);//Se almacena valor para usar en useEffect para updatear por fecha
        const filtered = (dataDiscrepancias?.data || []).filter((record: any) => {
            const matchesFilterField = filterField === 'folio'
                ? record.folio.toLowerCase().includes(value)
                : filterField === 'RecepciónCarozo.SDP'
                ? record.RecepciónCarozo.SDP?.toLowerCase().includes(value)
                : filterField === 'RecepciónCarozo.CSG'
                ? record.RecepciónCarozo.CSG?.toLowerCase().includes(value)
                : false;
            const matchesDate = fechaSeleccionada ? record.RecepciónCarozo.FecRecepcion.includes(fechaSeleccionada) : true;
            return matchesFilterField && matchesDate;
        });
        setFilteredRecords(filtered);
    }


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
            <p><strong>Fecha de Peso:</strong> {data.RecepciónCarozo.FecPeso.toString().replace("T", " ").slice(0,19)}</p>
        </div>
    );
    if (isLoading) return <div>Cargando data...</div>;
    if (error) return <div>Error de carga de data</div>;




return(
    <div className="tabla">
        <button className="botonDescarga" onClick={export2CVS}>Descargar Data</button>
        <input type="text" placeholder={`   Busca por ${filterField === 'folio' ? 'Folio' : filterField === 'RecepciónCarozo.CSG' ? 'CSG' : 'SDP'}`} onChange={handleChange}></input>
        <select onChange={handleSelectChange}>
            <option value="folio">Folio</option>
            <option value="RecepciónCarozo.CSG">CSG</option>
            <option value="RecepciónCarozo.SDP">SDP</option>
        </select>
        <input type="date" placeholder="fecha" onChange={handleDateChange} />
        <DataTable
            title="Discrepancias"
            theme="prueba"
            columns={[
                {name: 'Folio', sortable:true,selector:(row: Discrepancia) => row.folio},
                {name: 'Usuario',grow:2, sortable:true,selector:(row: Discrepancia) => row.user_name},
                {name: 'Discrepancia',grow:5,sortable:true, selector:(row: Discrepancia) => row.discrepancia},
                {name: 'Productor',
                    grow:4,
                    sortable:true,
                    selector:(row: Discrepancia) => row.RecepciónCarozo.Nom_prod,
                    cell: (row: Discrepancia) => <div className={isMobile ? 'ocultar-columna' : ''}>{row.RecepciónCarozo.Nom_prod}</div>,
                    omit: isMobile},
                    //Con "cell" le damos clase a columna. Con "omit" la ocultamos en mobile.
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