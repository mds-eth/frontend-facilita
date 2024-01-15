import { ToastContainer } from 'react-toastify';
import { ClientProvider } from './context/ClientContext';
import { SessionProvider } from './context/SessionContext';

import Routes from './routes';

function App() {
  return (
    <SessionProvider>
      <ClientProvider>
        <Routes />
        <ToastContainer />
      </ClientProvider>
    </SessionProvider>
  );
}

export default App
