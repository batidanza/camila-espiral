import React from 'react';
import './Navbar.css';
import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-links">
        <Link to="/work" className="navbar-link">WORK</Link>
        <Link to="/contact" className="navbar-link">CONTACT</Link>
      </div>
    </div>
  );
}

export default Navbar;
