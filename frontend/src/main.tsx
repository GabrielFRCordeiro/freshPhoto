import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import Home from "./routes/Home"
import Perfil from './routes/Perfil.tsx'
import Desenvolvimento from './routes/Desenvolvimento.tsx'
import Configuracoes from './routes/Configuracoes.tsx'
import Login from './routes/Login.tsx'
import Cadastro from './routes/Cadastro.tsx'
import Explorar from './routes/Explorar.tsx'
import Duvidas from './routes/Duvidas.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Desenvolvimento />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/entrar",
        element: <Login />,
      },
      {
        path: "/entrar/cadastro",
        element: <Cadastro />,
      },
      {
        path: "/explorar",
        element: <Explorar />,
      },
      {
        path: "/duvidas",
        element: <Duvidas />,
      },
      {
        path: "/perfil",
        element: <Perfil />,
      },
      {
        path: "/configuracoes",
        element: <Configuracoes />,
      },
      {
        path: "/home",
        element: <Navigate to='/' />,
      },
      {
        path: "/login",
        element: <Navigate to='/entrar' />,
      },
      {
        path: "/cadastro",
        element: <Navigate to='/entrar/cadastro' />,
      }
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
