import { useCallback, useState, useEffect } from "react";
import { client } from "../supabase/client";
import "../components/stylesheets/inputDiscValComp.css";

import {useDropzone} from 'react-dropzone'


function InputDiscValComp () {
    const [files, setFiles] = useState<File[]>([]);//archivo
    const [fileName, setFileName] = useState<string>('');//nombre de archivo
    const [nFolio, setnFolio] = useState("");//N° de folio, sin letra
    const [discrepancia, setDiscrepancia] = useState("");//discrepancia
    const [selectValue, setSelectValue] = useState("G");//Valor de select, letra folio
    const folio = selectValue + nFolio;//Letra folio + N° folio

//--------------------Funcion para enviar datos a la base de datos--------------------
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();//evita la recarga de la pagina
        const { data: { user: nombreUsuario} } = await client.auth.getUser();//para nombvre y ID de usuario.
        try {
            //Insertar datos en la tabla DiscrepanciaValidacion
            const  { data, error } = await client.from('DiscrepanciaValidacion').insert([{
                Folio: folio,
                Discrepancia: discrepancia,
                UserID: nombreUsuario?.id,
                UserName: (nombreUsuario?.user_metadata.full_name === null ? nombreUsuario?.email?.split("@")[0] : nombreUsuario?.user_metadata.full_name),
            }]);
            //Subir foto al storage bucket fotosDiscrepancia
            const { data: uploadPhoto, error: uploadError } = await client.storage
            .from('fotosDiscrepancia')//nombre del bucket
            .upload(`fotos/${folio}`, files[0]);//('ruta en el bucket/nombreque le quedara al archivo', archivo)
            console.log(data, error);
            console.log(nFolio + " " + discrepancia);
            console.log(uploadPhoto, uploadError);
            setnFolio("");
            setDiscrepancia("");
            setFileName("");
            setFiles([]);
        } catch (error) {
            console.log("error en CRUD "+ error);
        }
    }
//--------------------Funcion para aceptar el archivo--------------------
    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles(acceptedFiles);
        setFileName(acceptedFiles[0].name);
        console.log(acceptedFiles[0].name);
    } , []);
//--------------------Funcion para habilitar dropzone--------------------
    const {getRootProps, getInputProps, isDragActive, fileRejections} = useDropzone({
        onDrop,//callback para aceptar el archivo
        accept: {'image/*': ['.jpeg', '.jpg', '.png', '.gif']},//aceptar solo imagenes
        maxFiles: 1
    })
//--------------------Alerta para archivos no permitidos----------------
    useEffect(() => {
        if (fileRejections.length === 1) {
            alert(`Archivo no permitido, solo se permiten imagenes`);
            }
            }//useEffect para que solo aparezca una vez el alert
            , [fileRejections]);
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
                        value={nFolio}
                        onChange={e=>setnFolio(e.target.value)}/>
                </label>
                <label>
                    <input
                    type="text"
                    name="discrepancia"
                    placeholder="Discrepancia y observaciones"
                    required
                    value={discrepancia}
                    onChange={e=>setDiscrepancia(e.target.value)}/>
                </label>
                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {
                        isDragActive ?
                        <div className='dragZoneActive'>Suelta aquí tu archivo ...</div> :
                        <div className='dragZone'>{fileName !== '' ? fileName : 'Arrastra un archivo aca, o click para seleccionarlo'}</div>
                    }
                    </div>
                <input type="submit" value="Enviar Discrepancia" />
            </form>
        </div>
    )
}

export default InputDiscValComp;