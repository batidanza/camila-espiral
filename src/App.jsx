import React from 'react';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css';
import Home from './components/layout/Home';
import Contact from './components/contact/Contact.jsx'
import Work from './components/work/Work.jsx';
import Collection from './components/work/Collection.jsx';
import Logo from './components/layout/Logo.jsx';

function App() {
  return (
<div className='App'>
<Logo/>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/work" element={<Work />} />
    <Route path='/collection/:id' element={<Collection />} />
  </Routes>
</div>
  );
}

export default App;
