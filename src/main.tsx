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
import InputDiscValPag from './pages/inputDiscValPag.tsx'
import '@picocss/pico'
import UpdateDB from './pages/upload.tsx'
import TableDiscPag from './pages/tableDiscValPag.tsx'


const router = createBrowserRouter([
  { path: '/', element: <App />, errorElement: <NotFoundPage/> },
  { path: '/login', element: <Login /> },
  { path: '/home', element: <Home /> },
  { path: '/exito', element: <Exito /> },
  { path: '/upload', element: <UpdateDB /> },
  { path: '/lista', element: <ListaDiscrepancias /> },
  { path: '/inputDiscValPag', element: <InputDiscValPag/>},
  { path: '/tableDiscValPag', element: <TableDiscPag/>},
]);



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
