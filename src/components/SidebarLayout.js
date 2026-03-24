import React, { useState } from 'react';
import { FaBars, FaUpload, FaHome, FaSignOutAlt, FaKeyboard } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Add this
import './SidebarLayout.css';

const SidebarLayout = ({ children, handleLogout }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="layout-container">
      <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <FaBars onClick={toggleSidebar} className="menu-icon" />
          {!collapsed && <span className="logo-text">Swara Lipi</span>}
        </div>
        <ul className="sidebar-menu">
          <li>
            <Link to="/dashboard">
              <FaHome />
              <span className={!collapsed ? '' : 'hide'}>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/upload">
              <FaUpload />
              <span className={!collapsed ? '' : 'hide'}>Upload</span>
            </Link>
          </li>
          <li>
            <Link to="/sargam-editor">
              <FaKeyboard />
              <span className={!collapsed ? '' : 'hide'}>Sargam Editor</span>
            </Link>
          </li>
          <li onClick={handleLogout}>
            <FaSignOutAlt />
            <span className={!collapsed ? '' : 'hide'}>Logout</span>
          </li>
        </ul>
      </div>

      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default SidebarLayout;
