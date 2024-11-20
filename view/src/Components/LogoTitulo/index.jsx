import './LogoTitulo.css'

function LogoTitulo(props) {
    const { pagina } = props;
    
  return (<section className={pagina}>
    <hr className='barraTitulo' />
    <div className='caixaTitulo'><h1>Fresh Photo</h1></div>
    </section>
  )
}

export default LogoTitulo