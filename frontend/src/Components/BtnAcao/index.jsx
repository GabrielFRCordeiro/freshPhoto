import './BtnAcao.css'


function BtnAcao(props) {
    const { texto } = props
  return (
    <button className='btnAcao'>{texto}</button>
  )
}

export default BtnAcao