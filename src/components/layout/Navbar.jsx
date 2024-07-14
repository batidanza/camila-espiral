import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo6.png";
import "./Logo.css";

const Navbar = () => {
  return (
    <div className="nav">
      <Link className="link-rrd" to="/work">
        <p className="nav-link">Work</p>
      </Link>
      <Link to="/contact" className="link-rrd">
        <p className="nav-link"> About & Contact</p>
      </Link>
    </div>
  );
};

export default Navbar;
