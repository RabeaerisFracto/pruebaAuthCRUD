import './App.css'
import { useEffect } from 'react';

import UserData from './components/userData';


function App() {

  const userData = UserData();
  useEffect(()=>{
    
    console.log(userData)
  },[])



  return (
    <>
      <div>Pagina Inicial</div>
      <h2>{}</h2>
    </>
  )
}

export default App
