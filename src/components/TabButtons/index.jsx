import { useState } from 'react';

import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

import ModalComponent from '../Modal';

const TabButtons = () => {

  const [typeModal, setTypeModal] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = (typeModal) => {
    setModalOpen(true);
    setTypeModal(typeModal);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Container sx={{
        display: 'flex',
        justifyContent: 'space-between',
        paddingLeft: '0px !important',
        paddingRight: '0px !important',
        paddingBottom: '20px'
      }}>
        <Button variant="contained" color="primary" onClick={() => handleOpenModal('route')}>
          Verificar Rota
        </Button>
        <Button variant="contained" color="secondary" onClick={() => handleOpenModal('create')}>
          Adicionar
        </Button>
      </Container>
      <ModalComponent open={modalOpen} onClose={handleModalClose} modal={typeModal} />
    </>
  );
};

export default TabButtons;
