import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Cadastrar from './pages/Cadastrar';

function App() {
  return (<BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/cadastrar" element={<Cadastrar />} />
    </Routes>
  </BrowserRouter>);
}

export default App;
