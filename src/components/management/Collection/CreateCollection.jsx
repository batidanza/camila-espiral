import React, { useState } from "react";
import { createCollection } from "../../../services/collectionAPI";
import LoadingSketch from "../../layout/LoadingSketch";
import CustomTextInput from "../FormComponents/CustomTextInput";

const CreateCollection = () => {
  const [collectionFormData, setCollectionFormData] = useState({
    Name: "",
    Image: null,
    Description: "",
    Date: "",
  });

  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      setCollectionFormData({ ...collectionFormData, [name]: file });
      setPreview(URL.createObjectURL(file)); // Set preview URL
    } else {
      setCollectionFormData({ ...collectionFormData, [name]: value });
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setCollectionFormData({ ...collectionFormData, Image: file });
      setPreview(URL.createObjectURL(file)); // Set preview URL
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleRemoveImage = (e) => {
    e.stopPropagation(); // Prevent click event from bubbling up
    setCollectionFormData({ ...collectionFormData, Image: null });
    setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      console.log("collectionFormData before submission:", collectionFormData);
      const formDataToSubmit = new FormData();

      Object.entries(collectionFormData).forEach(([key, value]) => {
        if (value) {
          formDataToSubmit.append(key, value);
        }
      });

      const apiResponse = await createCollection(formDataToSubmit);

      if (apiResponse.success) {
        console.log(apiResponse.data);
        alert("Collection created");

        // No need to fetch collections here since it's handled by UploadCollectionPhotos
      } else {
        console.error("Error creating collection:", apiResponse.error);
      }
    } catch (error) {
      console.error("Error creating collection:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="my-container-form">
  {isLoading && <div className="loading"><LoadingSketch /></div>}
      <h3 className="form-title">CREATE COLLECTION</h3>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="my-form-form"
      >
        <div className="my-form-group-form">
          <label htmlFor="Name" className="my-label-form">
            COLLECTION NAME
          </label>
          <CustomTextInput
            value={collectionFormData.Name}
            onChange={handleChange}
            name="Name"
            placeholder="NAME"
            required
          />
        </div>

        <div className="my-form-group-form">
          <label htmlFor="Description" className="my-label-form">
            DESCRIPTION
          </label>
          <CustomTextInput
            value={collectionFormData.Description}
            onChange={handleChange}
            name="Description"
            placeholder="DESCRIPTION"
          />
        </div>
        <label htmlFor="Description" className="my-label-form">
          IMAGE
        </label>
        <div
          className="my-form-group-form drop-zone"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => document.querySelector('input[name="Image"]').click()} // Open file picker on click
        >
          <input
            type="file"
            className="my-input-form"
            name="Image"
            accept="image/*"
            onChange={handleChange}
            style={{ display: "none" }}
          />
          {preview ? (
            <div style={{ position: "relative" }}>
              <img
                src={preview}
                alt="Preview"
                style={{
                  width: "100px",
                  height: "auto",
                  margin: "5px",
                }}
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                style={{
                  position: "absolute",
                  top: "0",
                  right: "0",
                  background: "rgba(255, 0, 0, 0.8)",
                  border: "none",
                  color: "white",
                  cursor: "pointer",
                  borderRadius: "50%", // Round button
                  width: "24px",
                  height: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                }}
              >
                X
              </button>
            </div>
          ) : (
            <p>Drop an Image or click to select it</p>
          )}
        </div>

        <button type="submit" className="my-button-form">
          CREATE COLLECTION
        </button>
      </form>
    </div>
  );
};

export default CreateCollection;
