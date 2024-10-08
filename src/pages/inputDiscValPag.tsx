import EsquinaUsuario from '../components/esquinaUsuario';
import InputDiscValComp from '../components/inputDiscValComp';
import './stylesheets/pags.css';

function InputDiscValPag (){
    return(
        <div>
            <h1 className='titulo'>Discrepancia en validación</h1>
            <EsquinaUsuario/>
            <InputDiscValComp/>
        </div>
    )
}

export default InputDiscValPag;