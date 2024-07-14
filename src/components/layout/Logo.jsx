import React from 'react';
import './Navbar.css';
import { Link } from "react-router-dom";
import Link1 from "../../assets/Link5.png";
import Link2 from "../../assets/Link6.png";

const Logo = () => {
  return (
    <div className="logo">
      <div className="logo-links">
        <Link to="/work" className="logo-link">
          CAMILA-ESPIRAL
        </Link>
      </div>
    </div>
  );
}

export default Logo;
