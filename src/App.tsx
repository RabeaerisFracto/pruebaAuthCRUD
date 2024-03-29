import './App.css'
import { useEffect, useState } from 'react'
import { client } from './supabase/client'


function App() {
  const [user, setUser] = useState({});

  useEffect(()=>{
    async function getUserData(){
        await client.auth.getUser().then((value)=>{
            if(value.data?.user){
                setUser(value.data.user)
                console.log(value.data.user)
                console.log(user)
            }
        })}
    getUserData();
},[]);
  return (
    <>
      <div>Pagina Inicial</div>
    </>
  )
}

export default App
