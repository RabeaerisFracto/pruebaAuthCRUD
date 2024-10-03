import { useState } from "react";
import { client } from "../supabase/client";
import '../components/stylesheets/discrepancia.css';


function Discrepancia() {

const [discrepancia, setDiscrepancia] = useState("");
const [folio, setFolio] = useState("");
// useState DEBE estar dentro de la función principal, no puede estar fuera de ella


const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //El tipo React.FormEvent<HTMLFormElement> indica que el evento es específico para un elemento de formulario HTML
  //(HTMLFormElement). Esto significa que la función handleSubmit se utilizará como controlador de eventos para un formulario en particular.
  e.preventDefault();
  // const usuario = await client.auth.getUser();
  // console.log(usuario);
  //esto solo sirve para cuando no es necesario destructurar, sino que se necesita el objeto completo
  //Aqui se puede comprobar en consola que data se divide en user y error
  const { data: { user:otroNombre } } = await client.auth.getUser();
  //se usan {} para desestructurar el objeto, se accede a la propiedad data y se desestructura el objeto user
  //los : se usan para renombrar la variable, en este caso se renombra user a otroNombre
  // console.log(otroNombre);
  // console.log(discrepancia + " " + folio);
  try{
    const {data, error} = await client.from('Discrepancia').insert([{
      discrepancia: discrepancia,
      folio: folio,
      user_id: otroNombre?.id, // ? necesario para que no de error en la consola
      user_name: (otroNombre?.user_metadata.full_name === null ? otroNombre?.email?.split("@")[0] : otroNombre?.user_metadata.full_name),
    }]);
    console.log(data, error);
    //Gestion de errores para administrar alertas
    if(error?.code === '23505'){
      if(confirm('Discrepancia en folio ya ingresada, desea actualizar??')){

        const update = await client
        .from('Discrepancia')
        .update(
          {
            discrepancia: discrepancia,
            user_id: otroNombre?.id,
            user_name: (otroNombre?.user_metadata.full_name === null ? otroNombre?.email?.split("@")[0] : otroNombre?.user_metadata.full_name),
          }
        )
        .eq('folio', folio);
        console.log(update);
        alert('Discrepancia actualizada');
      }}
}catch(error){
    console.log("error en CRUD "+error);
  }
}

  return(
  <div className="componente-discrepancia">
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
      <button className="boton-discrepancia">Enviar</button>
    </form>
  </div>
  )
}
export default Discrepancia;