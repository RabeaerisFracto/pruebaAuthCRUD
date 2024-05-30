import {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import Papa from 'papaparse';
import { client } from '../supabase/client';

function MyDropzone() {
  const onDrop = useCallback((acceptedFiles: any) => {
    console.log(acceptedFiles[0].text())
    const uploadFile = async (file: File) => {
      const fileData = await file.text();
      const parsedData = Papa.parse(fileData, { header: true, dynamicTyping: true }).data;
      const { data, error } = await client.from('duplicate').insert({ 
        Numero: (parsedData as { Numero: string }[])[0].Numero,
        Estado: (parsedData as { Estado: string }[])[0].Estado,
        KilosFolio: (parsedData as { KilosFolio: string }[])[0].KilosFolio,
        Cprod: (parsedData as { Cprod: string }[])[0].Cprod,
        Grp_prod: (parsedData as { Grp_prod: string }[])[0].Grp_prod,
        Chofer: (parsedData as { Chofer: string }[])[0].Chofer,
        PesoCamion: (parsedData as { PesoCamion: string }[])[0].PesoCamion,
        TaraCamion: (parsedData as { TaraCamion: string }[])[0].TaraCamion,
        PatenteCarro: (parsedData as { PatenteCarro: string }[])[0].PatenteCarro,
        TotEnvSal: (parsedData as { TotEnvSal: string }[])[0].TotEnvSal,
        PatenteCamion: (parsedData as { PatenteCamion: string }[])[0].PatenteCamion,
        FecRecepcion: (parsedData as { FecRecepcion: string }[])[0].FecRecepcion,
        Transportista: (parsedData as { Transportista: string }[])[0].Transportista,
        GuiaProductor: (parsedData as { GuiaProductor: string }[])[0].GuiaProductor,
        FecCosecha: (parsedData as { FecCosecha: string }[])[0].FecCosecha,
        TipoFruta: (parsedData as { TipoFruta: string }[])[0].TipoFruta,
        Folio: (parsedData as { Folio: string }[])[0].Folio,
        CHto: (parsedData as { CHto: string }[])[0].CHto,
        SDP: (parsedData as { SDP: string }[])[0].SDP,
        TranspRut: (parsedData as { TranspRut: string }[])[0].TranspRut,
        Car1: (parsedData as { Car1: string }[])[0].Car1,
        CEnv: (parsedData as { CEnv: string }[])[0].CEnv,
        CTfr: (parsedData as { CTfr: string }[])[0].CTfr,
        CCnd: (parsedData as { CCnd: string }[])[0].CCnd,
        PesoCarro: (parsedData as { PesoCarro: string }[])[0].PesoCarro,
        TaraCarro: (parsedData as { TaraCarro: string }[])[0].TaraCarro,
        ConEnvases: (parsedData as { ConEnvases: string }[])[0].ConEnvases,
        Bins: (parsedData as { Bins: string }[])[0].Bins,
        Kilos_prom: (parsedData as { Kilos_prom: string }[])[0].Kilos_prom,
        FecDestara: (parsedData as { FecDestara: string }[])[0].FecDestara,
        Cesp: (parsedData as { Cesp: string }[])[0].Cesp,
        Cvar: (parsedData as { Cvar: string }[])[0].Cvar,
        Grp_Var: (parsedData as { Grp_Var: string }[])[0].Grp_Var,
        CPlt: (parsedData as { CPlt: string }[])[0].CPlt,
        Marca: (parsedData as { Marca: string }[])[0].Marca,
        Nomb: (parsedData as { Nomb: string }[])[0].Nomb,
        FecSalida: (parsedData as { FecSalida: string }[])[0].FecSalida,
        FecPeso: (parsedData as { FecPeso: string }[])[0].FecPeso,
        Tipo_cos: (parsedData as { Tipo_cos: string }[])[0].Tipo_cos,
        UM: (parsedData as { UM: string }[])[0].UM,
        Nom_prod: (parsedData as { Nom_prod: string }[])[0].Nom_prod,
        Color: (parsedData as { Color: string }[])[0].Color,
        Nota: (parsedData as { Nota: string }[])[0].Nota,
        Temporada: (parsedData as { Temporada: string }[])[0].Temporada,
        CSG: (parsedData as { CSG: string }[])[0].CSG,
      });
      if (error) {
        console.error('Error uploading file:', error);
      } else {
        console.log('File uploaded successfully:', data);
      }
    };

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
            <p>Suelta aquí tu archivo ...</p> :
            <p>Arrastra un archivo aca, o clickea para seleccionarlo</p>
        }
      </div>
      <button type="submit">Subir</button>
    </form>
  )
}

export default MyDropzone