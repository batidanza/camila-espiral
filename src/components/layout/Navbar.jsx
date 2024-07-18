import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../management/user/Login"; // Assuming this is where useAuth is imported from
import logo from "../../assets/logo6.png";
import "./Logo.css";

const Navbar = () => {
  const location = useLocation();
  const { loggedIn, logout } = useAuth(); // Get loggedIn state and logout function

  // Check if the current path is "/"
  if (location.pathname === "/") {
    return null; // Return null to render nothing
  }

  return (
    <div className="nav">
      <Link className="link-rrd" to="/work">
        <p className="nav-link">Work</p>
      </Link>
      <p className="nav-link">-</p>
      <Link to="/contact" className="link-rrd">
        <p className="nav-link">About & Contact</p>
      </Link>
      {loggedIn && (
        <>
          <Link to="/management" className="link-rrd">
            <p className="nav-link">Management</p>
          </Link>
          <button onClick={logout} className="nav-logout">
            Logout
          </button>
        </>
      )}
    </div>
  );
};

export default Navbar;
