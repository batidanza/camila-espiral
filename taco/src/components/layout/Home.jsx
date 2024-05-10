import React from 'react';
import videoSource from '../../assets/taco-background-video.mp4';
import './Home.css'; 
import Navbar from './Navbar';

const Home = () => {
  return (
    <>
        <Navbar />
      <div className="video-container">
        <video autoPlay loop muted className="background-video">
          <source src={videoSource} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Aquí puedes agregar contenido adicional que quieras superponer sobre el video */}
      </div>
    </>
  );
}

export default Home;
