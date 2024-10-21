import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Login from './pages/login.tsx'
import Home from './pages/home.tsx'
import Exito from './pages/exito.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom'
import NotFoundPage from './pages/404.tsx'
import ListaDiscrepancias from './pages/lista.tsx'
import InputDiscValPag from './pages/inputDiscValPag.tsx'
import UpdateDB from './pages/upload.tsx'
import TableDiscPag from './pages/tableDiscValPag.tsx'
import EsquinaUsuario from './components/esquinaUsuario.tsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <><Route path="/" element={<EsquinaUsuario />}>
      <Route index element={<App />} errorElement={<NotFoundPage />} />
      <Route path="home" element={<Home />} />
      <Route path="exito" element={<Exito />} />
      <Route path="upload" element={<UpdateDB />} />
      <Route path="lista" element={<ListaDiscrepancias />} />
      <Route path="inputDiscValPag" element={<InputDiscValPag />} />
      <Route path="tableDiscValPag" element={<TableDiscPag />} />
    </Route>
    <Route path="login" element={<Login />} /></>

  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
