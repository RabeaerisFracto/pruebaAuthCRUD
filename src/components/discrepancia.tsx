import { useState, useEffect } from "react";
import { client } from "../supabase/client";


function Discrepancia() {

const [discrepancia, setDiscrepancia] = useState("");
const [folio, setFolio] = useState("");
const [user, setUser] = useState({});

useEffect(()=>{// solo para confirmar que el usuario esta logueado x consola
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



const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //El tipo React.FormEvent<HTMLFormElement> indica que el evento es específico para un elemento de formulario HTML
  //(HTMLFormElement). Esto significa que la función handleSubmit se utilizará como controlador de eventos para un formulario en particular.
  e.preventDefault();
  const usuario = await client.auth.getUser();
  console.log(usuario);
  //esto solo sirve para cuando no es necesario destructurar, sino que se necesita el objeto completo
  //Aqui se puede comprobar en consola que data se divide en user y error
  const { data: { user:otroNombre } } = await client.auth.getUser();
  //se usan {} para desestructurar el objeto, se accede a la propiedad data y se desestructura el objeto user
  //los : se usan para renombrar la variable, en este caso se renombra user a otroNombre
  console.log(otroNombre);
  console.log(discrepancia + " " + folio);
  try{
    const result = await client.from('Discrepancia').insert([{
      discrepancia: discrepancia,
      folio: folio,
      user_id: otroNombre?.id // ? necesario para que no de error en la consola
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