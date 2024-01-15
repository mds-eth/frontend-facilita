/* eslint-disable react/prop-types */

import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

import { CircularProgress } from '@mui/material';

import { useClientContext } from '../../context/ClientContext';

const DeleteClientModal = ({ onClose, ...props }) => {

  const { clientName, clientId } = props.props;

  const { loading, handleDeleteClient } = useClientContext();

  const handleDelete = async () => {

    const response = await handleDeleteClient(clientId);

    if (response) onClose?.();
  }

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Typography variant="h5" align="center" gutterBottom color="black">
            Deseja realmente remover <br />{clientName} ?
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
            <Button type="button" onClick={onClose} variant="outlined">Fechar</Button>
            <Button disabled={loading} onClick={handleDelete} type="submit" variant="outlined" color="error">{loading ? <CircularProgress /> : 'Remover'}</Button>
          </div>
        </>
      )}
    </>
  );
};

export default DeleteClientModal;
