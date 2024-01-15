/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import { CircularProgress } from '@mui/material';

import ApiService from '../../services/api.service';

const CalculateRouteModal = ({ onClose }) => {

  const [loading, setLoading] = useState(true);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    calculateDistanceAPI();

    async function calculateDistanceAPI() {

      try {

        const response = await ApiService.get('/calculate-route');

        setLoading(false);

        if (response.status === 200) {
          setLocations(response.data.response.locations);
        }
      } catch (error) {
        setLoading(false);
      }
    }
  }, [])

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 950 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="center">Nome localização</TableCell>
                  <TableCell align="center">Endereco</TableCell>
                  <TableCell align="center">Número</TableCell>
                  <TableCell align="center">CEP</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {locations?.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="center">{row.location_name}</TableCell>
                    <TableCell align="center">{row.address}</TableCell>
                    <TableCell align="center">{row.number}</TableCell>
                    <TableCell align="center">{row.cep}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
            <Button type="button" onClick={onClose} variant="outlined">Fechar</Button>
          </div>
        </>
      )}
    </>
  );
};

export default CalculateRouteModal;
