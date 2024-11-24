import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function TField(props) {
    const { texto, tipo, tamanho, id_campo } = props;

  return (
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <TextField id={id_campo} label={texto} variant="outlined" type={tipo} size={tamanho} />
    </Box>
  );
}
