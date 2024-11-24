import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './BtnVoltar.css';
import { Link } from 'react-router-dom';

export default function BtnVoltar({pagina}) {
  return (
    <Link to={pagina}>
      <IconButton aria-label="delete" id='btn_voltar'>
          <ArrowBackIcon />
      </IconButton>
    </Link>
  )
}
