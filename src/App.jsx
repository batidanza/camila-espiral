import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import './App.css';
import Home from './components/layout/Home';
import Contact from './components/contact/Contact.jsx'
import Work from './components/work/Work.jsx';

function App() {
  return (


<Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/work" element={<Work />} />
      </Routes>
    </Router>

  );
}

export default App;
