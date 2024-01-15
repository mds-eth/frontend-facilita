import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';

import { useClientContext } from '../../context/ClientContext';

const SearchInput = () => {

  const { searchClients } = useClientContext();

  const handleSearchClient = (value) => {
    searchClients(value);
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
        <TextField
          label="Pesquisar"
          variant="outlined"
          style={{ background: '#3B3B3B' }}
          fullWidth
          margin="normal"
          autoComplete='off'
          className='inputs'
          id="searchInput"
          InputProps={{

          }}
          InputLabelProps={{
            style: {
              color: '#FFFFFF'
            }
          }}
          onChange={(e) => handleSearchClient(e.target.value)}
        />
      </Container>
    </>
  );
};

export default SearchInput;
