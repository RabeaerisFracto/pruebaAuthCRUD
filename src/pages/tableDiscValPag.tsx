import TableDiscValComp from '../components/tableDiscValComp';
import './stylesheets/pags.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient();

function TableDiscValPag (){
    return(
        <QueryClientProvider client={queryClient}>
        <div>
            <TableDiscValComp/>
        </div>
        </QueryClientProvider>
    )
}

export default TableDiscValPag;