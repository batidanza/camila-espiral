import React from 'react';
import { Link } from 'react-router-dom';
import './Contact.css'

const Contact = () => {
  const email = 'creative.taco.art@gmail.com';
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;

  return (
    <div className='contact-container'>
      <p className='contact-name'>TACO</p>
      <p className='contact-info'>CREATIVE</p>
      <p className='contact-info'> based in Buenos Aires</p>
      <br></br>
      <Link to={gmailUrl} target="_blank" rel="noopener noreferrer" className='contact-link'>{email}</Link>
    </div>
  );
};

export default Contact;
