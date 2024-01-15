/* eslint-disable react/prop-types */
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import FormClientModal from './FormClientModal';
import CalculateRouteModal from './CalculateRouteModal';
import DeleteClientModal from './DeleteClientModal';

const modalType = {
  'create': FormClientModal,
  'route': CalculateRouteModal,
  'deleteClient': DeleteClientModal,
}

const ModalComponent = ({ open, onClose, modal, ...props }) => {

  const RenderModalComponent = modalType[modal];

  if (!RenderModalComponent) {
    return null;
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        minWidth: 550,
        bgcolor: 'background.paper',
        p: 2,
        outline: 'none',
        textAlign: 'center'
      }}>
        <RenderModalComponent onClose={onClose} props={props} />
      </Box>
    </Modal>
  );
};

export default ModalComponent;
