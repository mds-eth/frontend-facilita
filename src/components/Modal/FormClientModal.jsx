/* eslint-disable react/prop-types */
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { toast } from 'react-toastify';

import InputMask from 'react-input-mask';

import 'react-toastify/dist/ReactToastify.css';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { CircularProgress } from '@mui/material';

import { clientSchema } from '../../schemas/clientSchema';

import { useClientContext } from '../../context/ClientContext';
import { hostAPICEP } from '../../services/configHost';

const FormClientModal = ({ onClose }) => {

  const { control, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(clientSchema),
  });

  const { loading, handleCreateClient } = useClientContext();

  const handleCreate = async (data) => {

    const response = await handleCreateClient(data);

    if (response) onClose?.();
  };

  const fetchAddressData = async (cep) => {

    try {
      const response = await fetch(`${hostAPICEP.host}/${cep}`);

      const data = await response.json();

      if (!data.code) {
        setValue('address', `${data.address} - ${data.district}` || '');
        setValue('coordinate_x', data.lng || '');
        setValue('coordinate_y', data.lat || '');

      } else {
        return toast.error('CEP não localizado.');
      }
    } catch (error) {
      return toast.error('CEP não localizado.');
    }
  };

  const handleCepBlur = async (e) => {
    const cep = e.target.value.replace(/\D/g, '');
    if (cep.length === 8) {
      await fetchAddressData(cep);
    }
  };

  return (
    <Box>
      <Typography variant="h5" align="center" gutterBottom color="black">
        Novo cliente
      </Typography>
      <form onSubmit={handleSubmit(handleCreate)}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField label="Nome" fullWidth margin="normal" {...field} error={!!errors.name} helperText={errors.name?.message} autoComplete='off' />
          )}
        />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Email"
                  fullWidth
                  margin="normal"
                  {...field}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  autoComplete='off'
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <InputMask mask="(99) 9 9999-9999" maskChar={null} value={field.value} onChange={e => field.onChange(e.target.value)}>
                  {(field) => (
                    <TextField
                      label="Telefone"
                      fullWidth
                      margin="normal"
                      {...field}
                      error={!!errors.phone}
                      helperText={errors.phone?.message}
                      autoComplete='off'
                    />
                  )}
                </InputMask>
              )}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Controller
              name="cep"
              control={control}
              render={({ field }) => (
                <InputMask mask="99999-999" maskChar={null} value={field.value} onChange={e => field.onChange(e.target.value)} onBlur={handleCepBlur}>
                  {(inputProps) => (
                    <TextField
                      label="CEP"
                      fullWidth
                      margin="normal"
                      {...inputProps}
                      error={!!errors.cep}
                      helperText={errors.cep?.message}
                      autoComplete='off'
                    />
                  )}
                </InputMask>
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="number"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Número"
                  fullWidth
                  margin="normal"
                  {...field}
                  error={!!errors.number}
                  helperText={errors.number?.message}
                  autoComplete='off'
                />
              )}
            />
          </Grid>
        </Grid>

        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth margin="normal"
              type="text"
              {...field}
              error={!!errors.address}
              helperText={errors.address?.message}
              autoComplete='off'
              disabled
              placeholder='Endereco'
            />
          )}
        />
        <Controller
          name="location_name"
          control={control}
          render={({ field }) => (
            <TextField label="Nome Localizacão" fullWidth margin="normal" {...field} error={!!errors.location_name} helperText={errors.location_name?.message} autoComplete='off' />
          )}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
          <Button type="button" onClick={onClose} variant="outlined">Fechar</Button>
          <Button disabled={loading} type="submit" variant="contained" color="success">{loading ? <CircularProgress /> : 'Cadastrar'}</Button>
        </div>
      </form>
    </Box>
  );
};

export default FormClientModal;
