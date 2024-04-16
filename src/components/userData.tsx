import { useEffect, useState } from 'react';
import { client } from '../supabase/client';

async function UserData() {

const [user, setUser] = useState<any>();
const [email, setEmail] = useState('nada' as string | undefined);
const [id, setId] = useState('nada' as string | undefined);


useEffect(()=>{
    async function getUserData(){
                await client.auth.getUser().then(({data}) => {;
                setUser(data.user);
                setEmail(data.user?.email);
                setId(data.user?.id);
                console.log(data.user)
                console.log(data)
                console.log(user)
                console.log(email)
                console.log(id)
                console.log("Data desde el hook UserData");
            }
        );
        }
    getUserData();
    }
    ,[]);
}

export default UserData;