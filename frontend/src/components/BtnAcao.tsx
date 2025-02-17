import '../styles/components/btnacao.scss'

interface BtnAcaoProps {
  children: React.ReactNode;
  icone: string;
}

const BtnAcao: React.FC<BtnAcaoProps> = ({ children, icone }) => {
  return (
    <button className='btn_acao'><i className={`bi bi-${icone} me-2`}></i>{children}</button>
  );
}

export default BtnAcao;