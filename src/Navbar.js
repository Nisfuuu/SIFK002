import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css"; // Import CSS untuk Navbar

const Navbar = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">My App</div>
        <div className={`navbar-links ${isOpen ? "open" : ""}`}>
          <button onClick={onLogout} className="navbar-button">
            Logout
          </button>
          <button onClick={() => navigate("/group-list")} className="navbar-button">
            Lihat Grup
          </button>
          <button onClick={() => navigate("/contact-list")} className="navbar-button">
            Lihat Kontak Dosen
          </button>
          <button onClick={() => navigate("/elearning-list")} className="navbar-button">
            Lihat E-Learning
          </button>
        </div>
        <div className="navbar-hamburger" onClick={toggleMenu}>
          <div className={`line ${isOpen ? "open" : ""}`}></div>
          <div className={`line ${isOpen ? "open" : ""}`}></div>
          <div className={`line ${isOpen ? "open" : ""}`}></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
