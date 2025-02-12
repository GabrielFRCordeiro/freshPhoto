import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from "./routes/Home"
import Seguindo from './routes/Seguindo.tsx'
import Entrar from './routes/Entrar.tsx'
import Perfil from './routes/Perfil.tsx'
import Desenvolvimento from './routes/Desenvolvimento.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Desenvolvimento />,
    children: [
      {
        path: "/",
        element: <Entrar />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/seguindo",
        element: <Seguindo />,
      },
      {
        path: "/perfil",
        element: <Perfil />,
      }
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
