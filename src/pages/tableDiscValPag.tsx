import EsquinaUsuario from '../components/esquinaUsuario';
import TableDiscValComp from '../components/tableDiscValComp';
import './stylesheets/pags.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient();

function TableDiscValPag (){
    return(
        <QueryClientProvider client={queryClient}>
        <div>
            {/* <h1 className='titulo'>Discrepancia en validación</h1> */}
            <TableDiscValComp/>
            <EsquinaUsuario/>
        </div>
        </QueryClientProvider>
    )
}

export default TableDiscValPag;