import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="header">
      <div className="logo-container">
        <img src="/swar-logo.png" alt="SwarLipi Logo" className="logo" />
        <h1 className="app-title">SwarLipi</h1>
      </div>
      <nav className="nav">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/editor">Sargam</Link>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </nav>
    </header>
  );
};

export default Header;
