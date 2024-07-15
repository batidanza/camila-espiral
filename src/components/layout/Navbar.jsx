import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo6.png";
import "./Logo.css";

const Navbar = () => {
  const location = useLocation();

  // Check if the current path is "/"
  if (location.pathname === "/") {
    return null; // Return null to render nothing
  }

  return (
    <div className="nav">
      <Link className="link-rrd" to="/work">
        <p className="nav-link">Work</p>
      </Link>
      <p className="nav-link">
        -
      </p>
      <Link to="/contact" className="link-rrd">
        <p className="nav-link">About & Contact</p>
      </Link>
    </div>
  );
};

export default Navbar;
