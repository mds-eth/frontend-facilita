import LogoutIcon from '@mui/icons-material/Logout';
import Container from '@mui/material/Container';

import { useSessionContext } from '../../context/SessionContext';

const Header = () => {

  const { logout } = useSessionContext();

  return (
    <>
      <Container sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        paddingLeft: '0px !important',
        paddingRight: '0px !important',
        paddingBottom: '20px'
      }}>
        <LogoutIcon fontSize='large' onClick={logout} style={{ cursor: 'pointer' }} />
      </Container>
    </>
  );
};

export default Header;
