import React from 'react';
import { Link } from 'react-router-dom';
import './LogoHeader.css';

function LogoHeader() {
  return (
    <div className="logo-header">
      <Link to="/">
        <img src={`${process.env.PUBLIC_URL}/swar-logo.png`} alt="SwarLipi Logo" className="logo-img" />
      </Link>
    </div>
  );
}

export default LogoHeader;
