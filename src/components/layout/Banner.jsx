import React from "react";
import "./Banner.css";

const Banner = () => {
  return (
    <div className="banner">
      <div className="banner-content">
        <p>
          CONTACT ME AT  {" "}
          <a className="anchor" href="mailto:cxmilaestrada@gmail.com">
            cxmilaestrada@gmail.com
          </a>
        </p>   
        <p>
          {" "}
          INSTAGRAM {"  "}
          <a
            className="anchor"
            href="https://www.instagram.com/camilaespiral"
            target="_blank"
            rel="noopener noreferrer"
          >
            @camilaespiral
          </a>
        </p>
      </div>
    </div>
  );
};

export default Banner;
