import { User } from '../context/UserContext';

import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

function DataOnScreen() {
    const user = useContext(UserContext) as User | undefined;
// Se usa useContext para obtener el valor del contexto, y se tipa como User | undefined
// User es la interfaz que se importa del archivo UserContext.tsx
    return(
        <div>
            <h2>{user?.email}</h2>
        </div>
    )
}

export default DataOnScreen;