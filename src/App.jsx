import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Contact from "./components/contact/Contact.jsx";
import Work from "./components/sketch/Work.jsx";

import Collection from "./components/work/Collection.jsx";
import RapidImagePrintSketch from "./components/sketch/RapidImagePrintSketch.jsx";

import WorkSketchPixel from "./components/sketch/WorkSketchPixel.jsx";
import WorkSketchPixel2 from "./components/sketch/WorkSketchPixel2.jsx";

import Login, { AuthProvider } from "./components/management/user/Login.jsx";
import Management from "./components/management/Management.jsx";
import Navbar from "./components/layout/Navbar.jsx";
import WorkHome from "./components/work/WorkHome.jsx";
import CreateArchive from "./components/management/Archive/CreateArchive.jsx";
import UploadArchivePhotos from "./components/management/Archive/UploadArchivePhotos.jsx";
import CreateCollection from "./components/management/Collection/CreateCollection.jsx";
import UploadCollectionPhotos from "./components/management/Collection/UploadCollectionPhotos.jsx";
import ManageCollections from "./components/management/Collection/ManageCollections.jsx";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/work" element={<WorkHome />} />
          <Route path="/manage-collections" element={<ManageCollections/>} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/animated-collection" element={<Work />} />
          <Route path="/experimentation" element={<WorkSketchPixel />} />
          <Route path="/rapid-image-print" element={<RapidImagePrintSketch />} />
          <Route path="/" element={<WorkSketchPixel2 />} />
          <Route path="/collection/:id" element={<Collection />} />
          <Route path="/collection-create" element={<CreateCollection/>} />
          <Route path="/collection-photos-upload" element={<UploadCollectionPhotos/>} />
          <Route path="/collection-archive-create" element={<CreateArchive/>} />
          <Route path="/collection-archive-photos-upload" element={<UploadArchivePhotos/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/management" element={<Management />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
