import InputDiscValComp from '../components/inputDiscValComp';
import './stylesheets/pags.css';

function InputDiscValPag (){
    return(
        <div className='inputValidacion'>
            <h1 className='titulo'>Discrepancia en validación</h1>
            <InputDiscValComp/>
        </div>
    )
}

export default InputDiscValPag;