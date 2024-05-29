import {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import Papa from 'papaparse';
import { client } from '../supabase/client';

function MyDropzone() {
  const onDrop = useCallback((acceptedFiles: any) => {
    console.log(acceptedFiles[0].text())
      const reader = new FileReader()

      reader.onabort = () => console.log('Lectura del archivo abortada')
      reader.onerror = () => console.log('Lectura del archivo fallida')
      reader.onload = () => {
        const fileContent = reader.result as any;
        console.log(fileContent)

        Papa.parse(fileContent, {
          header: true,
          complete: async (result) =>{
            const {data} = result;

            // const {error:deleteError} = await client
            // .from('duplicate')
            // .delete();

            // if(deleteError){
            //   console.log('Error al borrar datos',deleteError);
            //   return;
            // }

            const {error:insertError} = await client
            .from('duplicate')
            .insert(data);

            if (insertError){
              console.log('Error al insertar datos', insertError);
            } else {
              console.log('Datos insertados correctamente');
            }
          }
        });
      }

  }, []);

  const {getRootProps, getInputProps, isDragActive, acceptedFiles} = useDropzone({onDrop})
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(acceptedFiles);
  }
  return (
    <form onSubmit={handleSubmit}>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Suelta aquí tu archivo ...</p> :
            <p>Arrastra un archivo aca, o clickea para seleccionarlo</p>
        }
      </div>
      <button type="submit">Subir</button>
    </form>
  )
}

export default MyDropzone