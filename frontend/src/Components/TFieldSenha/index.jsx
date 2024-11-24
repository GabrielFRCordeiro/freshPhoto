import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function BasicTextFields(props) {
    const { tamanho, value, onChange } = props;

    const handleChange = (e) => {
      onChange(e.target.value);
  };

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" size={tamanho}>
        <InputLabel htmlFor="outlined-adornment-password" className='text-capitalize' required>senha</InputLabel>
        <OutlinedInput
          id="t_field_senha"
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
          value={value}
          onChange={handleChange}
          required
        />
      </FormControl>
  );
}
