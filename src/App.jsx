import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./components/layout/Home";
import Contact from "./components/contact/Contact.jsx";
import Work from "./components/work/Work.jsx";

import Collection from "./components/work/Collection.jsx";
import Logo from "./components/layout/Logo.jsx";
import Banner from "./components/layout/Banner.jsx";
import RapidImagePrintSketch from "./components/work/RapidImagePrintSketch.jsx";

import WorkSketchPixel from "./components/work/WorkSketchPixel.jsx";
import WorkSketchPixel2 from "./components/work/WorkSketchPixel2.jsx";

import CreateCollection from "./components/management/Collection/CreateCollection.jsx";
import ArchiveForms from "./components/management/Archive/ArchiveForms.jsx";
import Login, { AuthProvider } from "./components/management/user/Login.jsx";
import Management from "./components/management/Management.jsx";
import Navbar from "./components/layout/Navbar.jsx";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/work" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/animated-collection" element={<Work />} />
          <Route path="/experimentation" element={<WorkSketchPixel />} />
          <Route path="/rapid-image-print" element={<RapidImagePrintSketch />} />
          <Route path="/" element={<WorkSketchPixel2 />} />
          <Route path="/collection/:id" element={<Collection />} />
          <Route path="/collection-create" element={<CreateCollection />} />
          <Route path="/collection-archive-create" element={<ArchiveForms />} />
          <Route path="/login" element={<Login />} />
          <Route path="/management" element={<Management />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
