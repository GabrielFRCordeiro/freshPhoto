import CaixaPerfil from "../../Components/CaixaPerfil";
import ListaImagens from "../../Components/ListaImagens";
import LogoTitulo from "../../Components/LogoTitulo";
import Navegacao from "../../Components/Navegacao";

function Perfil() {
  return (<>
    <Navegacao />
    <LogoTitulo pagina='perfil' />
    <CaixaPerfil />
    <ListaImagens />
  </>
  );
}

export default Perfil;
