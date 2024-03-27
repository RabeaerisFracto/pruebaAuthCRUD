import './App.css'
import Login from './pages/login.tsx';
import Home from './pages/home.tsx';
import Exito from './pages/exito.tsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Exito/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/exito" element={<Exito/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
