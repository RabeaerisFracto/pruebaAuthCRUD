import { useCallback, useState, useEffect } from "react";
import { client } from "../supabase/client";
import "../components/stylesheets/inputDiscValComp.css";

import {useDropzone} from 'react-dropzone'


function InputDiscValComp () {
    const [files, setFiles] = useState<any>([]);//archivo, de type any, xke preview no esta en el type File
    const [fileName, setFileName] = useState<string>('');//nombre de archivo
    const [especie, setEspecie] = useState("PA");//Especie
    const [nFolio, setnFolio] = useState("");//N° de folio, sin letra
    const [discrepancia, setDiscrepancia] = useState("");//discrepancia
    const [selectValue, setSelectValue] = useState("G");//Valor de select, letra folio
    const folio = selectValue + nFolio;//Letra folio + N° folio

//--------------------Funcion para enviar datos a la base de datos--------------------
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();//evita la recarga de la pagina
        const { data: { user: nombreUsuario} } = await client.auth.getUser();//para nombvre y ID de usuario.
        if (files.length === 0) {
            alert("No se ha seleccionado ningun archivo");
            return;
        }else{
            try {
                //Insertar datos en la tabla DiscrepanciaValidacion
                const  { data, error } = await client.from('DiscrepanciaValidacion').insert([{
                    Folio: folio,
                    Discrepancia: discrepancia,
                    Especie: especie,
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
    }
//--------------------Funcion para aceptar el archivo--------------------
    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles(acceptedFiles.map(file=>//Se mapea sobre los archivos aceptados
            Object.assign(file, {//Se asigna una nueva propiedad al objeto file
                preview: URL.createObjectURL(file)//Nombre propiedad es preview, valor es la URL del archivo
            })
        ));
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
//---------------------------------Thumbs--------------------------------

const thumbs = files.map((file: { preview: string; }) => (
        <div key={file.preview}>
        <img
            src={file.preview}
            onLoad={() => { URL.revokeObjectURL(file.preview) }}
        />
        </div>

));
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label className="label">
                    <select className="especie"
                        onChange={e=> setEspecie(e.target.value)}>
                        <option value="PA">PA</option>
                        <option value="MN">MN</option>
                        <option value="CE">CE</option>
                    </select>
                    <select className="letrafolio"
                        onChange={e => setSelectValue(e.target.value)}>
                        <option value="G">G</option>
                        <option value="L">L</option>
                        <option value="H">H</option>
                        <option value="C">C</option>
                    </select>
                    <input
                        type="number"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={6}
                        name="folio"
                        placeholder="N° de folio"
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
                    <aside>
                        {thumbs}
                    </aside>
                <input type="submit" value="Enviar Discrepancia" />
            </form>
        </div>
    )
}

export default InputDiscValComp;