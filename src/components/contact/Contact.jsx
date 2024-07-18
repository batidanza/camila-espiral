import React from "react";
import { Link } from "react-router-dom";
import "./Contact.css";
import CollectionCarroussel from "../work/CollectionCarroussel";

const Contact = () => {
  const email = "cxmilaestrada@gmail.com";
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    email
  )}`;

  return (
    <>
      <div className="contact-container">
        <p className="contact-name">camila espiral</p>
        <p className="contact-info">image-maker</p>
        <p className="contact-info"> based in Buenos Aires and New York</p>
        <br></br>
        <Link
          to={gmailUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="contact-link"
        >
          {email}
        </Link>
      </div>
    </>
  );
};

export default Contact;
