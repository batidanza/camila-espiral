import React from "react";
import videoSource from "../../assets/back-video.mp4";
import element1 from "../../assets/image (1).png";
import element2 from "../../assets/image (4).png";
import "./Home.css";
import Navbar from "./Navbar";
import Fan from "../sketch/Fan";
import { Link } from "react-router-dom";


const Home = () => {
  return (
    <>
      <Navbar />
      <Link to="/experimentation">
      <img  className="elementLink" src={element1} />
      </Link>
      <Link to="/experimentation-2">
      <img  className="elementLink" src={element2} />
      </Link>
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
