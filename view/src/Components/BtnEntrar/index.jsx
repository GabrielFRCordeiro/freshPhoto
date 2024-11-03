import Button from '@mui/material/Button';
import './BtnEntrar.css';

export default function BtnEntrar({texto, componente}) {
  return (
    <Button variant="contained" startIcon={componente} type='submit' id='btnEntrar' >
        {texto}
    </Button>
  )
}


