import React, { useState, useEffect } from "react";
import { uploadPhoto } from "../../../services/photoAPI";
import {
  fetchCollection,
  createCollection,
} from "../../../services/collectionAPI";
import "../FormStyles.css";

const CreateCollection = () => {
  const [collectionFormData, setCollectionFormData] = useState({
    Name: "",
    Image: "",
    Description: "",
    Date: "",
  });

  const [photoFormData, setPhotoFormData] = useState({
    selectedFile: null,
    collections: [],
    selectedCollection: "",
    photoName: "",
  });

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const data = await fetchCollection();
        if (data) {
          setPhotoFormData({ ...photoFormData, collections: data });
        } else {
          console.error("Error fetching collections: data is undefined");
        }
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };

    fetchCollections();
  }, []);

  const handleCollectionChange = (e) => {
    setPhotoFormData({ ...photoFormData, selectedCollection: e.target.value });
  };

  const handlePhotoFileChange = (e) => {
    setPhotoFormData({ ...photoFormData, selectedFile: e.target.files[0] });
  };

  const handlePhotoNameChange = (e) => {
    setPhotoFormData({ ...photoFormData, photoName: e.target.value });
  };

  const handlePhotoUpload = async () => {
    try {
      if (!photoFormData.selectedFile || !photoFormData.selectedCollection) {
        console.error("Missing file or collection selection");
        return;
      }

      const formData = new FormData();
      formData.append("Image", photoFormData.selectedFile);
      formData.append("CollectionID", photoFormData.selectedCollection);
      formData.append("Name", photoFormData.photoName);

      const response = await uploadPhoto(formData);
      if (response.success) {
        console.log("Media uploaded successfully:", response.data);
        alert("Media uploaded successfully");

        const updatedCollections = await fetchCollection();
        if (updatedCollections) {
          setPhotoFormData({
            ...photoFormData,
            collections: updatedCollections,
          });
        } else {
          console.error("Error fetching updated collections");
        }
      } else {
        console.error("Error uploading media:", response.error);
        alert("Error uploading media");
      }
    } catch (error) {
      console.error("Error uploading media:", error);
      alert("Error uploading media");
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setCollectionFormData({ ...collectionFormData, [name]: files[0] });
    } else {
      setCollectionFormData({ ...collectionFormData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("collectionFormData before submission:", collectionFormData);
    const formDataToSubmit = new FormData();

    Object.entries(collectionFormData).forEach(([key, value]) => {
      formDataToSubmit.append(key, value);
    });

    const apiResponse = await createCollection(formDataToSubmit);

    if (apiResponse.success) {
      console.log(apiResponse.data);
      alert("Collection created");

      const updatedCollections = await fetchCollection();
      if (updatedCollections) {
        setPhotoFormData({
          ...photoFormData,
          collections: updatedCollections,
        });
      } else {
        console.error("Error fetching updated collections");
      }
    } else {
      console.error("Error creating collection:", apiResponse.error);
    }
  };

  return (
    <div className="form-containers">
      <div className="my-container-form">
        <h3 className="form-title">CREATE COLLECTION</h3>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="my-form-form"
        >
          <div className="my-form-group-form">
            <label htmlFor="Name" className="my-label-form">
              NAME
            </label>
            <input
              type="text"
              className="my-input-form"
              name="Name"
              value={collectionFormData.Name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="my-form-group-form">
            <label htmlFor="Description" className="my-label-form">
              DESCRIPTION
            </label>
            <textarea
              className="my-textarea-form"
              name="Description"
              value={collectionFormData.Description}
              onChange={handleChange}
            />
          </div>

          <div className="my-form-group-form">
            <label htmlFor="Date" className="my-label-form">
              DATE
            </label>
            <input
              type="date"
              className="my-input-form"
              name="Date"
              value={collectionFormData.Date}
              onChange={handleChange}
            />
          </div>

          <div className="my-form-group-form">
            <label className="my-label-form" htmlFor="Image">
              IMAGE
            </label>
            <input
              type="file"
              className="my-input-form"
              name="Image"
              accept="image/*"
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="my-button-form">
            CREATE COLLECTION
          </button>
        </form>
      </div>

      <div className="my-container-form">
        <form className="my-form-form">
          <h3 className="form-title">UPLOAD COLLECTION PHOTOS</h3>
          <div className="my-form-group-form">
            <label className="my-label-form" htmlFor="Image">
              COLLECTION
            </label>
            <select
              value={photoFormData.selectedCollection}
              className="my-input-form"
              onChange={handleCollectionChange}
            >
              <option value="">Select a collection</option>
              {photoFormData.collections.map((collection) => (
                <option key={collection.ID} value={collection.ID}>
                  {collection.Name}
                </option>
              ))}
            </select>
          </div>
          <div className="my-form-group-form">
            <label className="my-label-form" htmlFor="Image">
              PHOTO IDENTIFIER
            </label>
            <input
              className="my-input-form"
              type="text"
              value={photoFormData.photoName}
              name="photoName"
              onChange={handlePhotoNameChange}
              placeholder="Photo identifier"
            />
          </div>
          <div className="my-form-group-form">
            <label className="my-label-form" htmlFor="Image">
              IMAGE
            </label>
            <input
              className="my-input-form"
              type="file"
              onChange={handlePhotoFileChange}
            />
          </div>
          <button
            type="button" // Usamos type="button" para evitar enviar el formulario aquí
            className="my-button-form"
            onClick={handlePhotoUpload}
          >
            Upload images for collection
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCollection;
