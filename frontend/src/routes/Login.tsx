import BtnAcao from "../components/BtnAcao";
import Apresentacao from '../assets/apresentacao.png';

export default function Login() {
  return (
    <>
      <aside>
        <h1 className="d-lg-none">Fresh Photo</h1>
        <p>O Fresh Photo te ajuda a encontrar ótimas receitas e dicas de culinária</p>
        <img src={Apresentacao} className='img_apresentacao d-none d-lg-block' alt='pessoas cozinhando com um texto resumo do Fresh Photo' />
      </aside>
      <main>
        <h1 className="d-none d-lg-block">Fresh Photo</h1>
        <form>
          <input type="text" id="t_field_login" className="form-control my-3 t_field" aria-describedby="passwordHelpBlock" placeholder="Usuário ou email" required />
                
          <input type="password" id="t_field_senha" className="form-control mb-3 t_field" aria-describedby="passwordHelpBlock" placeholder="Senha" required />
          <a href='./desenvolvimento.html'>
            <p className='esqueceu_senha onda text-start'>Esqueceu sua senha?</p>
          </a>
          <p className="validacao text-center" id="text_validacao"></p>
          <BtnAcao icone="box-arrow-in-right">Login</BtnAcao>
          <a href="./cadastrar.html">
            <p className="sem_conta onda text-center mt-3">Ainda não tem uma conta?</p>
          </a>
        </form>
      </main>
    </>
  )
}
