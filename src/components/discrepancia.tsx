import { useState, useEffect } from "react";
import { client } from "../supabase/client";


function Discrepancia() {

const [discrepancia, setDiscrepancia] = useState("");
const [folio, setFolio] = useState("");
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
//averiguar como acceder al id del usuario


const handleSubmit = async (e: any) => {
  e.preventDefault();
  const user = client.auth.getUser();
  console.log(user);
  console.log(discrepancia + " " + folio);
  try{
    const result = await client.from('Discrepancia').insert([{
      discrepancia: discrepancia,
      folio: folio,
      user_id: user
    }]);
    console.log(result);
  }catch(error){
    console.log("error en CRUD "+error);
  }
}

  return(
  <div>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="discrepancia"
        placeholder="Discrepancia"
        required
        onChange={e=>setDiscrepancia(e.target.value)}/>
      <input
        type="text"
        name="folio"
        placeholder="Folio"
        required
        onChange={e=>setFolio(e.target.value)}/>
      <button>Enviar</button>
    </form>
  </div>
  )
}
export default Discrepancia;