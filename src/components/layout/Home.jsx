import React from "react";
import videoSource from "../../assets/back-video.mp4";
import element1 from "../../assets/Blue-Windows-icon.png";
import element2 from "../../assets/Blue-Windows-icon.png";
import "./Home.css";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { useAuth } from "../management/user/Login";

const Home = () => {
  const { loggedIn, currentUser, logout } = useAuth();

  return (
    <>
      <Navbar />
      <div className="admin-buttons">
        {loggedIn && (
          <>
            <Link to="/management">
              <button className="management-button">Management</button>
            </Link>
            <button onClick={logout} className="management-button">
              Logout
            </button>
          </>
        )}
      </div>
      <div className="elements-container">
        <Link to="/experimentation">
          <img className="elementLink" src={element1} />
        </Link>
        <Link to="/experimentation-2">
          <img className="elementLink" src={element2} />
        </Link>
      </div>
      <div className="video-container">
        <video autoPlay loop muted className="background-video">
          <source src={videoSource} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </>
  );
};

export default Home;
