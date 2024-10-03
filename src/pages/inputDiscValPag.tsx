import EsquinaUsuario from '../components/esquinaUsuario';
import ImportDiscValComp from '../components/inputDiscValComp';

function InputDiscValPag (){
    return(
        <div>
            <h1 className='titulo'>Ingresar Disciplina y Valor</h1>
            <EsquinaUsuario/>
            <ImportDiscValComp/>
        </div>
    )
}

export default InputDiscValPag;