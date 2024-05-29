import EsquinaUsuario from '../components/esquinaUsuario';
import '../pages/stylesheets/pags.css';
import './stylesheets/upload.css';
import MyDropzone from '../components/dropzone';

function UpdateDB (){

    return(
        <div>
            <h1 className='titulo'>Actualizar Base de Datos</h1>
            <MyDropzone/>
            <EsquinaUsuario/>
        </div>
    )
}
export default UpdateDB;