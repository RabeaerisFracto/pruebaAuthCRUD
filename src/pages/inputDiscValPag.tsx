import EsquinaUsuario from '../components/esquinaUsuario';
import InputDiscValComp from '../components/inputDiscValComp';

function InputDiscValPag (){
    return(
        <div>
            <h1 className='titulo'>Ingresar Discrepancia en validación</h1>
            <EsquinaUsuario/>
            <InputDiscValComp/>
        </div>
    )
}

export default InputDiscValPag;