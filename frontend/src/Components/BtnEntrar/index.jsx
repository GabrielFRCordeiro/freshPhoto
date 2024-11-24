import Button from '@mui/material/Button';
import './BtnEntrar.css';

export default function BtnEntrar({texto, componente, id_entrada}) {
  return (
    <Button variant="contained" startIcon={componente} type='submit' id={id_entrada} className='text-uppercase' >
        {texto}
    </Button>
  )
}
