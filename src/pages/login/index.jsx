import { useEffect } from 'react';

import Grid from '@mui/material/Grid';

import { CircularProgress } from '@mui/material';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import 'react-toastify/dist/ReactToastify.css';
import { Box, Typography } from '@mui/material';
import { sessionSchema } from '../../schemas/sessionSchema';

import { useSessionContext } from '../../context/SessionContext';

const Login = () => {

  useEffect(() => {
    localStorage.clear();
  }, [])

  const { loading, handleCreateSession } = useSessionContext();

  const { handleSubmit, formState: { errors }, register } = useForm({
    resolver: yupResolver(sessionSchema),
  });

  const handleCreate = async (data) => {

    const response = await handleCreateSession(data);

    if (response) {
      window.location.href = '/dashboard';
    }
  }

  return (
    <Grid style={{ minWidth: '550px' }}>
      {loading ? (
        <CircularProgress />
      ) : (
        <Box>
          <Typography variant="h4" align="center" gutterBottom color="#FFF">
            Login
          </Typography>
          <form onSubmit={handleSubmit(handleCreate)}>
            <TextField
              style={{ background: '#3B3B3B' }}
              label="Email"
              fullWidth
              margin="normal"
              {...register('email')}
              error={!!errors.email}
              type='text'
              id='inputEmail'
              name='email'
              helperText={errors.email?.message}
              autoComplete='off'
              InputLabelProps={{
                style: {
                  color: '#FFFFFF'
                }
              }}
            />
            <TextField
              style={{ background: '#3B3B3B' }}
              label="Senha"
              fullWidth
              margin="normal"
              {...register('password')}
              error={!!errors.password}
              type='password'
              name='password'
              helperText={errors.password?.message}
              autoComplete='off'
              id='inputPassword'
              InputLabelProps={{
                style: {
                  color: '#FFFFFF'
                }
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
              <Button type="submit" variant="contained" color="success">{'Acessar'}</Button>
            </div>
          </form>
        </Box >
      )}

    </Grid >
  );
}

export default Login;
