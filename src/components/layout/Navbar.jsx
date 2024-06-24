import React from 'react';
import './Navbar.css';
import { Link } from "react-router-dom";
import Link1 from "../../assets/Link5.png";
import Link2 from "../../assets/Link6.png";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-links">
        <Link to="/work" className="navbar-link">
          <img src={Link1} alt="Work" />
        </Link>
        <Link to="/contact" className="navbar-link">
          <img src={Link2} alt="Contact" />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
