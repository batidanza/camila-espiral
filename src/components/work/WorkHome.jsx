import React from "react";
import { Link } from "react-router-dom";
import CollectionCarroussel from "./CollectionCarroussel";
import FolderIcon from "../../assets/folder-icon2.png";
import "./Work.css";

const WorkHome = () => {
  return (
    <>
      <div className="WorkHome">
        <CollectionCarroussel />
        <div className="separator-container">
        {" "}
        <span className="separator">COMMERCIAL WORK</span>
      </div>
      </div>
      <div className="exp-links">
        <div className="exp-link-container">
          <Link to="/experimentation">
            <img className="fold-image" src={FolderIcon} alt="" />
          </Link>
        </div>
        <div>
          <Link className="exp-link-container" to="/rapid-image-print">
            <img className="fold-image" src={FolderIcon} alt="" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default WorkHome;
