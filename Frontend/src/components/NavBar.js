import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { authenticated, loading } = useAuth();

  const handleLogout = async () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) return null;

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary position-sticky top-0 z-1">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">iNoteBook</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
            </li>
            {authenticated && (
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/YourNotes" ? "active" : ""}`} to="/YourNotes">Your Notes</Link>
              </li>
            )}
          </ul>
          <div className="d-flex mt-2">
            {authenticated ? (
              <button className="btn btn-primary mx-1 fw-bold" onClick={handleLogout}>Logout</button>
            ) : (
              <>
                <Link className="btn btn-primary mx-1 fw-bold" to="/login" role="button">Login</Link>
                <Link className="btn btn-primary mx-1 fw-bold" to="/signup" role="button">Signup</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;