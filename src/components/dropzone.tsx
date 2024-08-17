import {useCallback, useEffect, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import Papa from 'papaparse';
import { client } from '../supabase/client';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import IData from '../interfaces/IData';

dayjs.extend(customParseFormat);



function MyDropzone() {
  const [files, setFiles] = useState<File[]>([]);
  const [fileName, setFileName] = useState<string>('');
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    setFileName(acceptedFiles[0].name);
    console.log(acceptedFiles[0].name);
  }, []);

  const {getRootProps, getInputProps, isDragActive, fileRejections} = useDropzone({
    onDrop,
    accept: {'text/csv': ['.csv'], 'text/plain': ['.txt']},
    maxFiles: 1
  })


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    for (const file of files) {
      const fileData = await file.text();
      const parsedData: IData[] = Papa.parse(fileData, { header: true, dynamicTyping: true }).data as IData[];

      const cleanedData = [];
      for (const row of parsedData) {
        if (row.FecRecepcion) {
          row.FecRecepcion = dayjs(row.FecRecepcion, 'DD/MM/YYYY').format('YYYY-MM-DD');
        }
        if (row.FecCosecha) {
          row.FecCosecha = dayjs(row.FecCosecha, 'DD/MM/YYYY').format('YYYY-MM-DD');
        }
        if (row.FecDestara) {
          row.FecDestara = dayjs(row.FecDestara, 'DD/MM/YYYY').format('YYYY-MM-DD');
        }
        if (row.FecSalida) {
          row.FecSalida = dayjs(row.FecSalida, 'DD/MM/YYYY').format('YYYY-MM-DD');
        }
        if (row.FecPeso) {
          row.FecPeso = dayjs(row.FecPeso, 'DD/MM/YYYY').format('YYYY-MM-DD');
        }
        const {data: existingFolios} = await client
        .from('RecepciónCarozo')
        .select('Folio')
        .eq('Folio', row.Folio)
        .single();

        if (!existingFolios) {
          cleanedData.push({
            ...row,
            Folio: row.Folio || "",
          });
        }
      }
      if (cleanedData.length > 0) {
        const { error } = await client.from('RecepciónCarozo').insert(cleanedData);
        if (error) {
          console.error('Error en carga de archivo', error);
        } else {
          console.log('Carga de archivo exitosa');
          alert('Carga de '+ cleanedData.length +' registros nuevos exitosa');
          console.log('data ingresada',cleanedData);
        }
      } else {
        console.log('No hay datos nuevos para ingresar');
        alert('No hay datos nuevos para ingresar');
      }
    }
    setFiles([]);
    setFileName('');
  }
    useEffect(() => {
    if (fileRejections.length === 1) {
      alert(`Archivo no permitido, solo se permiten archivos .csv`);
    }
  }//useEffect para que solo aparezca una vez el alert
  , [fileRejections]);

  return (
    <form onSubmit={handleSubmit}>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {
          isDragActive ?
          <div className='dragZoneActive'>Suelta aquí tu archivo ...</div> :
          <div className='dragZone'>{fileName !== '' ? fileName : 'Arrastra un archivo aca, o click para seleccionarlo'}</div>
        }
      </div>
      <button type="submit">Subir</button>
    </form>
  )
}

export default MyDropzone


