import { useEffect } from 'react';
import './App.css'
import UserData from './components/userData';
import useUserStore from './store/userDataStore'


function App() {
  const user = useUserStore((state) => state.user);
  const userData = UserData();
  useEffect(()=>{
    if(user == null|| user == undefined){return}
    else{
    console.log("Este es el objeto fnalmente ctm!!: ")
    console.log(user)}
  },[useUserStore, userData, user])


  return (
    <>
      <div>Pagina Inicial</div>
      <h2>{}</h2>
    </>
  )
}

export default App
