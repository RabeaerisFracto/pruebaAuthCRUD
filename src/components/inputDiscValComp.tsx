import { useCallback, useState, useEffect } from "react";
import { client } from "../supabase/client";
import "../components/stylesheets/inputDiscValComp.css";

import {useDropzone} from 'react-dropzone'


function InputDiscValComp () {
    const [files, setFiles] = useState<File[]>([]);
    const [fileName, setFileName] = useState<string>('');
    const [nFolio, setnFolio] = useState("");
    const [discrepancia, setDiscrepancia] = useState("");
    const [selectValue, setSelectValue] = useState("G");
    const folio = selectValue + nFolio;


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { data: { user: nombreUsuario} } = await client.auth.getUser();
        try {
            const  { data, error } = await client.from('DiscrepanciaValidacion').insert([{
                Folio: folio,
                Discrepancia: discrepancia,
                UserID: nombreUsuario?.id,
                UserName: (nombreUsuario?.user_metadata.full_name === null ? nombreUsuario?.email?.split("@")[0] : nombreUsuario?.user_metadata.full_name),
            }]);
            const { data: uploadPhoto, error: uploadError } = await client.storage
            .from('fotosDiscrepancia')
            .upload(`fotos/${folio}`, files[0]);
            console.log(data, error);
            console.log(nFolio + " " + discrepancia);
            console.log(uploadPhoto, uploadError);
            setnFolio("");
            setDiscrepancia("");        
        } catch (error) {
            console.log("error en CRUD "+ error);
        }
    }

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles(acceptedFiles);
        setFileName(acceptedFiles[0].name);
        console.log(acceptedFiles[0].name);
    } , []);

    const {getRootProps, getInputProps, isDragActive, fileRejections} = useDropzone({
        onDrop,
        accept: {'image/*': ['.jpeg', '.jpg', '.png', '.gif']},
        maxFiles: 1
    })
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