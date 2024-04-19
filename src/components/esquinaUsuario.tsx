import { useEffect, useState } from 'react';
import UserData from './userData';
import useUserStore from '../store/userDataStore';
import '../components/stylesheets/esquinaUsuario.css'

export default function EsquinaUsuario() {
    
    const [email, setEmail] = useState('Buscando email...' as string | undefined);
    const [globalname, setGlobalname] = useState('Buscando nombre...' as string | undefined);
    const [provider, setProvider] = useState('Buscando proveedor...' as string | undefined);
    const [avatar, setAvatar] = useState('Buscando avatar...' as string | undefined);

    const user = useUserStore((state) => state.user);
    UserData();

    useEffect(() => {
        if (user == null || user == undefined) { return }
        else {
            setGlobalname(user.user_metadata.full_name)
            setEmail(user.email)
            setProvider(user.app_metadata.provider)
            setAvatar(user.user_metadata.avatar_url)
        }
    }, [user, EsquinaUsuario])

console.log(globalname)


    return (
        <div className='esquina-usuario'>
            <h4>{email}<br/>
            {globalname}<br/>
            {provider}<br/></h4>
            <img src={avatar} alt='avatar' />
        </div>
    )
}