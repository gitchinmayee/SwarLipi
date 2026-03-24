import React from "react";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import "./Sidebar.css";

const Sidebar = ({ isOpen }) => {
  const { logout } = useAuth();

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <h3 className="logo">🎵 SwarLipi</h3>
      <nav className="sidebar-nav">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/editor">Sargam Editor</Link>
        <Link to="/profile">Profile</Link>
        <button className="logout-btn" onClick={logout}>
          <FiLogOut /> Logout
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
