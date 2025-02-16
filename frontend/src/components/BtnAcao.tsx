import '../styles/components/btnacao.scss'

interface BtnAcaoProps {
  children: React.ReactNode;
}

const BtnAcao: React.FC<BtnAcaoProps> = ({ children }) => {
  return (
    <button className='btn_acao'>{children}</button>
  );
}

export default BtnAcao;