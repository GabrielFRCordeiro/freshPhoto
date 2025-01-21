import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Entrar from "./routes/Entrar.jsx";
import Login from "./routes/Login.jsx";
import Cadastrar from "./routes/Cadastrar.jsx";
import Home from "./routes/Home.jsx";
import Seguindo from "./routes/Seguindo.jsx";
import Perfil from "./routes/Perfil.jsx";
import MinhaConta from "./routes/MinhaConta.jsx";
import Desenvolvimento from "./routes/Desenvolvimento.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Entrar />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/cadastrar",
        element: <Cadastrar />,
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
      },
      {
        path: "/minha-conta",
        element: <MinhaConta />
      },
      {
        path: "/desenvolvimento",
        element: <Desenvolvimento />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
