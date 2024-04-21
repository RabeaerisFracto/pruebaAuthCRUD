import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Login from './pages/login.tsx'
import Home from './pages/home.tsx'
import Exito from './pages/exito.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFoundPage from './pages/404.tsx'
import ListaDiscrepancias from './pages/lista.tsx'
import '@picocss/pico'


const router = createBrowserRouter([
  { path: '/', element: <App />, errorElement: <NotFoundPage/> },
  { path: '/login', element: <Login /> },
  { path: '/home', element: <Home /> },
  { path: '/exito', element: <Exito /> },
  { path: '/lista', element: <ListaDiscrepancias /> },
]);



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
