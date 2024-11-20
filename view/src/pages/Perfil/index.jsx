import CaixaPerfil from "../../Components/CaixaPerfil";
import LogoTitulo from "../../Components/LogoTitulo";
import Navegacao from "../../Components/Navegacao";

function Perfil() {
  return (<>
    <Navegacao />
    <LogoTitulo pagina='perfil' />
    <CaixaPerfil />
  </>
  );
}

export default Perfil;
