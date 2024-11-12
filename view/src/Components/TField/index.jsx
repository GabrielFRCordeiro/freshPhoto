import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function TField(props) {
    const { texto, tipo, tamanho } = props;

  return (
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label={texto} variant="outlined" type={tipo} size={tamanho} />
    </Box>
  );
}
