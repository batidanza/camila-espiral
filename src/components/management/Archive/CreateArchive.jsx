import React, { useState, useEffect } from "react";
import { createArchive, fetchArchive } from "../../../services/ArchiveAPI";
import "../FormStyles.css";
import LoadingSketch from "../../layout/LoadingSketch";
import CustomTextInput from "../FormComponents/CustomTextInput";

const CreateArchive = () => {
  const [collectionFormData, setCollectionFormData] = useState({
    Name: "",
    Description: "",
    Image: null,
    preview: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const data = await fetchArchive();
        if (data) {
          setCollections(data);
        } else {
          console.error("Error fetching collections: data is undefined");
        }
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };

    fetchCollections();
  }, []);

  const handleInputChange = (value, name) => {
    setCollectionFormData({ ...collectionFormData, [name]: value });
  };

  const handleImageChange = (files) => {
    const file = files[0];
    setCollectionFormData({
      ...collectionFormData,
      Image: file,
      preview: URL.createObjectURL(file),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formDataToSubmit = new FormData();
      Object.entries(collectionFormData).forEach(([key, value]) => {
        formDataToSubmit.append(key, value);
      });

      const apiResponse = await createArchive(formDataToSubmit);
      if (apiResponse.success) {
        alert("Collection created");

        const updatedCollections = await fetchArchive();
        if (updatedCollections) {
          setCollections(updatedCollections);
        } else {
          console.error("Error fetching updated collections");
        }
      } else {
        console.error("Error creating collection:", apiResponse.error);
      }
    } catch (error) {
      console.error("Error creating collection:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setCollectionFormData({
      ...collectionFormData,
      Image: file,
      preview: URL.createObjectURL(file),
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleRemoveImage = () => {
    setCollectionFormData((prev) => ({
      ...prev,
      Image: null,
      preview: null,
    }));
  };

  return (
    <div className="my-container-form">
  {isLoading && <div className="loading"><LoadingSketch /></div>}
      <h3 className="form-title">CREATE ARCHIVE</h3>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="my-form-form"
      >
        <div className="my-form-group-form">
          <label htmlFor="Name" className="my-label-form">
            NAME
          </label>
          <CustomTextInput
            value={collectionFormData.Name}
            onChange={(value) => handleInputChange(value, "Name")}
            placeholder="Archive Name"
            required
          />
        </div>
        <div className="my-form-group-form">
          <label htmlFor="Description" className="my-label-form">
            DESCRIPTION
          </label>
          <CustomTextInput
            value={collectionFormData.Description}
            onChange={(value) => handleInputChange(value, "Description")}
            placeholder="Archive Description"
          />
        </div>
        <div
          className="my-form-group-form"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <label className="my-label-form" htmlFor="Image">
            IMAGE
          </label>
          <input
            type="file"
            name="Image"
            accept="image/*"
            onChange={(e) => handleImageChange(e.target.files)}
            style={{ display: "none" }}
          />
        <div
            className="drop-zone"
            onClick={(e) => {
              if (e.target.type !== "button") {
                document.querySelector('input[type="file"]').click();
              }
            }}
          >
            <div className="preview-images" style={{ position: "relative" }}>
              {collectionFormData.preview ? (
                <div
                  style={{
                    position: "relative",
                    display: "inline-block",
                    margin: "5px",
                  }}
                >
                  <img
                    src={collectionFormData.preview}
                    alt="Preview"
                    style={{ width: "100px", height: "auto", margin: "5px" }}
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
                    }}
                  >
                    X
                  </button>
                </div>
              ) : (
                <p>Drop images or click to select them</p>
              )}
            </div>
          </div>
        </div>
        <button type="submit" className="my-button-form">
          CREATE COLLECTION
        </button>
      </form>
    </div>
  );
};

export default CreateArchive;
