import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './BtnVoltar.css';

export default function BtnVoltar() {
  return (
    <IconButton aria-label="delete" id='btnVoltar'>
        <ArrowBackIcon />
    </IconButton>
  )
}
