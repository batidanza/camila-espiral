import React from 'react';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css';
import Home from './components/layout/Home';
import Contact from './components/contact/Contact.jsx'
import Work from './components/work/Work.jsx';

import Collection from './components/work/Collection.jsx';
import Logo from './components/layout/Logo.jsx';
import Banner from './components/layout/Banner.jsx';
import WorkSketchPixel from './components/work/WorkSketchPixel.jsx';
import WorkSketchPixel2 from './components/work/WorkSketchPixel2.jsx';

import CollectionForm from './components/management/CollectionForm.jsx';
import PhotoForm from './components/management/PhotoForm.jsx';
import CreateCollection from './components/management/CreateCollection.jsx';

function App() {
  return (
<div className='App'>
<Logo/>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/work" element={<Work />} />
    <Route path="/experimentation" element={<WorkSketchPixel/>} />
    <Route path="/experimentation-2" element={<WorkSketchPixel2/>} />
    <Route path='/collection/:id' element={<Collection />} />
    <Route path='/create-collection' element={<CollectionForm />} />
    <Route path='/upload-photo' element={<PhotoForm />} />
    <Route path='/create-collection' element={<CollectionForm />} />
    <Route path='/collection-create' element={<CreateCollection />} />
  </Routes>
</div>
  );
}

export default App;
