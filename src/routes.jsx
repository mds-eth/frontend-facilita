import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Login from './pages/login';
import Dashboard from './pages/dashboard';

import { useSessionContext } from './context/SessionContext';

const AppRoutes = () => {

  const { isAuthenticated } = useSessionContext();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route exact path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
