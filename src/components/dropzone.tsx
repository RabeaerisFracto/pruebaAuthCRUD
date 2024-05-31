import {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import Papa from 'papaparse';
import { client } from '../supabase/client';

interface IData {
Numero: string
Estado: string
KilosFolio: string
Cprod: string
Grp_prod: string
Chofer: string
PesoCamion: string
TaraCamion: string
PatenteCarro: string
TotEnvSal: string
PatenteCamion: string
FecRecepcion: string
Transportista: string
GuiaProductor: string
FecCosecha: string
TipoFruta: string
Folio: string
CHto: string
SDP: string
TranspRut: string
Car1: string
CEnv: string
CTfr: string
CCnd: string
PesoCarro: string
TaraCarro: string
ConEnvases: string
Bins: string
Kilos_prom: string
FecDestara: string
Cesp: string
Cvar: string
Grp_Var: string
CPlt: string
Marca: string
Nomb: string
FecSalida: string
FecPeso: string
Tipo_cos: string
UM: string
Nom_prod: string
Color: string
Nota: string
Temporada: string
CSG: string
}


function MyDropzone() {
  const onDrop = useCallback((acceptedFiles: any) => {
    console.log(acceptedFiles[0].text());
    const uploadFile = async (file: File) => {
      const fileData = await file.text();
      const duplicate: IData[] = Papa.parse(fileData, { header: true, dynamicTyping: true }).data as IData[];

      const cleanedData = duplicate.map(row => ({
        ...row,
        Folio: row.Folio || "",
      }));
      const { data, error } = await client.from('duplicate').insert(cleanedData);
    
      if (error) {
        console.error('Error en carga de archivo', error);
      } else {
        console.log('Carga de archivo exitosa', data);
      }

  }
    acceptedFiles.forEach((file: File) => {
      uploadFile(file);
    });
    
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
            <div className='dragZoneActive'>Suelta aquí tu archivo ...</div> :
            <div className='dragZone'>Arrastra un archivo aca, o click para seleccionarlo</div>
        }
      </div>
      <button type="submit">Subir</button>
    </form>
  )
}

export default MyDropzone