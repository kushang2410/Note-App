import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import NavBar from './components/NavBar';
import Home from './components/Home';
import YourNotes from './components/YourNotes';
import AddNotePage from './components/AddNotePage';
import Login from './components/Login';
import SignUp from './components/SignUp';
import useAuth from './hooks/useAuth';
import Alert from './components/Alert';
import { useContext } from 'react';
import AlertContext from './context/AlertContext';

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = useAuth();
  return isAuthenticated ? element : <Login />;
};

const AppContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { alert } = useContext(AlertContext);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token && location.pathname !== '/login' && location.pathname !== '/signup') {
      navigate('/login');
    }
    setLoading(false);
  }, [location.pathname, navigate]);

  if (loading) return null;

  const hideNavBar = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <>
      {!hideNavBar && <NavBar />}
      <div className="container">
        {alert && <Alert message={alert.message} type={alert.type} />}
        <Routes>
          <Route exact path="/" element={<ProtectedRoute element={<Home />} />} />
          <Route exact path="/YourNotes" element={<ProtectedRoute element={<YourNotes />} />} />
          <Route path="/add-note" element={<ProtectedRoute element={<AddNotePage />} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </>
  );
};

export default AppContent;