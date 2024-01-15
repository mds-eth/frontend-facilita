/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from 'react';

import { toast } from 'react-toastify';

import ApiService from '../services/api.service';

const ClientContext = createContext();

import { useSessionContext } from './SessionContext';

export const ClientProvider = ({ children }) => {

  const { isAuthenticated } = useSessionContext();

  const [loading, setLoading] = useState(true);
  const [loadingForm, setLoadingForm] = useState(false);
  const [clients, setClients] = useState([]);
  const [originalClients, setOriginalClients] = useState([]);

  const getClientsAPI = async () => {
    try {
      const response = await ApiService.get('/clients');
      setLoading(false);

      if (response.status === 200) {
        const fetchedClients = response.data.response;
        setOriginalClients(fetchedClients);
        setClients(fetchedClients);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const searchClients = (value) => {
    const lowercasedValue = value.toLowerCase();

    const filteredClients = originalClients.filter((client) => {
      return (
        client.name.toLowerCase().includes(lowercasedValue) ||
        client.email.toLowerCase().includes(lowercasedValue) ||
        client.phone.toLowerCase().includes(lowercasedValue)
      );
    });

    setClients(filteredClients);
  };

  useEffect(() => {

    if (isAuthenticated) {
      getClientsAPI();
    }
  }, []);

  const handleCreateClient = async (data) => {

    try {

      setLoadingForm(true);

      const response = await ApiService.post('/clients', data);

      if (response.status === 201) {
        toast.success('Cliente cadastrado com sucesso.');

        const newClient = response.data.response;

        setClients([...clients, newClient]);

        setLoadingForm(false);

        return true;
      }
      return false;
    } catch (error) {
      setLoadingForm(false);
      toast.error(error?.response?.data?.message || 'Ocorreu algum erro ao realizar cadastro, tente novamente.')
      return false;
    }
  };
  const handleDeleteClient = async (clientId) => {

    try {

      setLoading(true);

      const response = await ApiService.put(`/clients/${clientId}`);

      setLoading(false);

      if (response.status === 204) {
        toast.success('Cliente removido com sucesso.');

        setClients(clients.filter(client => client.id !== clientId));
        setOriginalClients(originalClients.filter(client => client.id !== clientId));

        return true;
      }
      return false;
    } catch (error) {
      setLoading(false);
      toast.error('Ocorreu algum erro ao remover cliente. Tente novamente.');
    }
  }

  return (
    <ClientContext.Provider value={{ clients, loading, loadingForm, handleCreateClient, handleDeleteClient, searchClients }}>
      {children}
    </ClientContext.Provider>
  );
};

export const useClientContext = () => {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error('useClientContext must be used within a ClientProvider');
  }
  return context;
};
