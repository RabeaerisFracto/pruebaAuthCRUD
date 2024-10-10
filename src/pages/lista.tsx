import MuestraDB from "../components/muestraDB";
import '../pages/stylesheets/pags.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient();

function ListaDiscrepancias (){
    return(
        <QueryClientProvider client={queryClient}>
        <div>
            {/* <h1 className='titulo'>Lista Discrepancias</h1> */}
            <MuestraDB/>
        </div>
        </QueryClientProvider>
    )
}
export default ListaDiscrepancias;