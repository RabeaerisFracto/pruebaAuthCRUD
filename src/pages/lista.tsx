import EsquinaUsuario from '../components/esquinaUsuario';
import MuestraDB from "../components/muestraDB";
import '../pages/stylesheets/pags.css'

function ListaDiscrepancias (){
    return(
        <div>
            <EsquinaUsuario/>
            <h1 className='titulo'>Lista Discrepancias</h1>
            <MuestraDB/>
        </div>
    )
}
export default ListaDiscrepancias;