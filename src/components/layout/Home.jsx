import React from "react";
import videoSource from "../../assets/back-video.mp4";
import "./Home.css";
import Navbar from "./Navbar";
import Fan from "../sketch/Fan";

const Home = () => {
  return (
    <>
      <Navbar />
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
