import './BtnAcao.css'


function BtnAcao(props) {
    const { texto, id_acao } = props
  return (
    <button className='btnAcao' id={id_acao}>{texto}</button>
  )
}

export default BtnAcao