import EsquinaUsuario from '../components/esquinaUsuario';
import '../pages/stylesheets/pags.css';
import { Importer } from 'react-csv-importer';
import 'react-csv-importer/dist/index.css';
import './stylesheets/upload.css';
import { client } from '../supabase/client';

function UpdateDB (){

    const español = {
        general: {
            goToPreviousStepTooltip: 'Atras'
        },
        fileStep: {
            initialDragDropPrompt: 'Arrastra archivo aca, o clickea para seleccionar carpeta',
            activeDragDropPrompt: 'Arrastra aca...',
            getImportError: (message: any) => `Error al importar: ${message}`,
            getDataFormatError: (message: any) => `Por favor, confirma el formato: ${message}`,
            goBackButton: 'Regresar',
            nextButton: 'Fin del preview',
            rawFileContentsHeading: 'Vista de archivo puro',
            previewImportHeading: 'Preview de importación',
            dataHasHeadersCheckbox: 'El archivo tiene encabezados',
            previewLoadingStatus: 'Cargando vista previa...',
        },
        fieldsStep: {
            stepSubtitle: 'Importar a la base de datos',
            requiredFieldsError: 'Por favor, asigna todas las columnas requeridas',
            nextButton: 'Importar',
            dragSourceAreaCaption: 'Columnas del archivo',
            getDragSourcePageIndicator: (currentPage: any, pageCount: any) => `Pagina ${currentPage} de ${pageCount}`,
            getDragSourceActiveStatus: (columnCode: any) => `Asignando columna ${columnCode}`,
            nextColumnsTooltip: 'Mostrar columnas siguientes',
            previousColumnsTooltip: 'Mostrar columnas anteriores',
            clearAssignmentTooltip: 'Limpiar asignación de columna',
            selectColumnTooltip: 'Seleccionar columna',
            unselectColumnTooltip: 'Deseleccionar columna',
            dragTargetAreaCaption: 'Columnas asignadas',
            getDragTargetOptionalCaption: (field: any) => `${field} (opcional)`,
            getDragTargetRequiredCaption: (field: any) => `${field} (requerido)`,
            dragTargetPlaceholder: 'Arrastra columna aqui',
            getDragTargetAssignTooltip: (columnCode: any) => `Asignar columna ${columnCode}`,
            dragTargetClearTooltip: 'Limpiar asignación de columna',
            columnCardDummyHeader: 'Campo sin asignar',
            getColumnCardHeader: (code: any) => `Columna ${code}`
        },
        progressStep: {
            stepSubtitle: 'Importar',
            uploadMoreButton: 'Subir mas archivos',
            finishButton: 'Terminar',
            statusError: 'No se pudo importar',
            statusComplete: 'Completo',
            statusPending: 'Importando...',
            processedRowsLabel: 'Filas procesadas:',
        }
    };
        const dataHandler = async (rows: any) => {
            try {
                const { data, error } = await client.from('Prueba base de datos').insert(rows);
                console.log(data, error);
            } catch (error) {}
            console.log(rows);
        };

//Se van a rellenar solo las columnas existentes, buena manera de filtrar informacion y columnas vacias. Lo otro es habilitar funcion de columnas, pero va a ser mas pega pal usuario, mejor que filtre la interfaz, y despues solo tenemos que pedirt la informacion necesaria. Ergo, lo que hay que hacer es especificar el nombre de las columnas x supabase.

    return(
        <div>
            <EsquinaUsuario/>
            <h1 className='titulo'>Actualizar Base de Datos</h1>
            <Importer
            locale={español}
                dataHandler={dataHandler}
            />
        </div>
    )
}
export default UpdateDB;