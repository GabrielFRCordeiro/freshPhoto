import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Cadastrar from './pages/Cadastrar';
import Perfil from './pages/Perfil';

function App() {
  return (<BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/cadastrar" element={<Cadastrar />} />
      <Route path='/perfil' element={<Perfil />} />
    </Routes>
  </BrowserRouter>);
}

export default App;
