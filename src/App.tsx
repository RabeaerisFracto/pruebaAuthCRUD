import { useEffect, useState } from 'react';
import './App.css'
import UserData from './components/userData';
// import { client } from './supabase/client';
import useUserStore from './store/userDataStore';//se importa el store de zustand, para setear el estado user.
// import EsquinaUsuario from './components/esquinaUsuario';
// import { useNavigate } from 'react-router-dom';


function App() {
  const [id, setId] = useState('Buscando id...' as string | undefined);//Se inicializa el estado id como string o undefined.
  const user = useUserStore((state) => state.user);//Se destructura el estado user del store de zustand.
  UserData();//El componente UserData se llama dentro de la funcion App, para obtener la data del usuario logueado.
  //Se necesita llamar al componente UserData, para que se ejecute el useEffect y se obtenga la data del usuario logueado.
  //El useEffect no se realizara si no se usa el componente. La store y el componente no son suficientes para obtener la data del usuario logueado.
  //******Debo importar siempre UserData()?
  useEffect(()=>{
    if(user == null|| user == undefined){return}//Para que no me renderice el user vacio
    else{
    setId(user.id)//Se setea el estado id con el id del usuario logueado.
    // console.log(user)
  }//log de user como objeto
    // console.log("user destructurado, presentando el mail: " +user.email);// Mail destructurado
  },[user])//Dependencias del useEffect

  // const navigate = useNavigate();
  // useEffect(() => {
  //     const checkSession = async () => {
  //         const { data: { session } } = await client.auth.getSession();
  //         if (session) {
  //             // navigate("/exito");
  //         } else {
  //             // navigate("/login");
  //         }
  //     }
  //     checkSession();
  // }, [navigate]);
  console.log(id)

  return (
    <>

    {/* <EsquinaUsuario/>
      <div>Pagina Inicial</div>
      <h2>No pasar directamente de zustand, sino que mediante useState: {id}</h2>
      <h3>El state demora una fraccion de segundo en actualizarce. Realizar manejo....</h3> */}
    </>
  )
}

export default App
