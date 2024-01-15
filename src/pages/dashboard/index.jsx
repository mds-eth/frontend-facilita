import { useState } from 'react';

import Grid from '@mui/material/Grid';

import { Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import { formatDate } from '../../utils/utils';
import TabButtons from '../../components/TabButtons';

import { CircularProgress } from '@mui/material';
import ModalComponent from '../../components/Modal';

import { useClientContext } from '../../context/ClientContext';
import SearchInput from '../../components/SearchInput';
import Header from '../../components/Header';

const Dashboard = () => {

  const { clients, loading } = useClientContext();

  const [typeModal, setTypeModal] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientId, setClientId] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = (typeModal, client) => {

    const { name, id } = client;

    setModalOpen(true);
    setTypeModal(typeModal);
    setClientName(name);
    setClientId(id);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <Grid style={{ minWidth: '950px' }}>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Header />
          <SearchInput />
          <TabButtons />
          <ModalComponent open={modalOpen} onClose={handleModalClose} modal={typeModal} clientName={clientName} clientId={clientId} />
          {clients.length > 0 ? (
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell align="center">Cliente</TableCell>
                    <TableCell align="center">Email</TableCell>
                    <TableCell align="center">Telefone</TableCell>
                    <TableCell align="center">Criado em</TableCell>
                    <TableCell align="center">Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {clients.map((client) => (
                    <TableRow
                      key={client.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {client.id}
                      </TableCell>
                      <TableCell align="center">{client.name}</TableCell>
                      <TableCell align="center">{client.email}</TableCell>
                      <TableCell align="center">{client.phone}</TableCell>
                      <TableCell align="center">{formatDate(client.created_at)}</TableCell>
                      <TableCell align="center">
                        <Button variant="contained" onClick={() => handleOpenModal('deleteClient', client)} >
                          <DeleteOutlinedIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography variant="h4" align="center" gutterBottom color="#FFF">
              Nenhum cliente localizado.
            </Typography>
          )}
        </>
      )}
    </Grid>
  );
}

export default Dashboard;
