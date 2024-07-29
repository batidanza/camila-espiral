import React, { useState, useEffect } from "react";
import { uploadPhoto } from "../../../services/photoAPI";
import { fetchCollection } from "../../../services/collectionAPI";
import LoadingSketch from "../../layout/LoadingSketch";
import CustomDropdown from "../FormComponents/CustomDropDown";
import CustomTextInput from "../FormComponents/CustomTextInput";

const UploadCollectionPhotos = () => {
  const [photoFormData, setPhotoFormData] = useState({
    selectedFiles: [],
    collections: [],
    selectedCollection: "",
    photoName: "",
    previews: [],
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const data = await fetchCollection();
        if (data) {
          setPhotoFormData((prev) => ({ ...prev, collections: data }));
        } else {
          console.error("Error fetching collections: data is undefined");
        }
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };

    fetchCollections();
  }, []);

  const handleCollectionChange = (selectedCollection) => {
    if (selectedCollection) {
      setPhotoFormData({ ...photoFormData, selectedCollection });
    } else {
      console.error("selectedCollection is undefined or null");
    }
  };

  const handlePhotoFileChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setPhotoFormData((prev) => ({
      ...prev,
      selectedFiles: [...prev.selectedFiles, ...files],
      previews: [...prev.previews, ...previews],
    }));
  };

  const handlePhotoNameChange = (e) => {
    setPhotoFormData({ ...photoFormData, photoName: e });
  };

  const handlePhotoUpload = async () => {
    setIsLoading(true);
    try {
      if (
        !photoFormData.selectedFiles.length ||
        !photoFormData.selectedCollection
      ) {
        console.error("Missing files or collection selection");
        return;
      }

      for (const file of photoFormData.selectedFiles) {
        const formData = new FormData();
        formData.append("Image", file);
        formData.append("CollectionID", photoFormData.selectedCollection);
        formData.append("Name", photoFormData.photoName);

        const response = await uploadPhoto(formData);
        if (response.success) {
          console.log("Media uploaded successfully:", response.data);
        } else {
          console.error("Error uploading media:", response.error);
        }
      }

      alert("Media uploaded successfully");

      const updatedCollections = await fetchCollection();
      if (updatedCollections) {
        setPhotoFormData((prev) => ({
          ...prev,
          collections: updatedCollections,
          selectedFiles: [],
          previews: [],
        }));
      } else {
        console.error("Error fetching updated collections");
      }
    } catch (error) {
      console.error("Error uploading media:", error);
      alert("Error uploading media");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setPhotoFormData((prev) => ({
      ...prev,
      selectedFiles: [...prev.selectedFiles, ...files],
      previews: [...prev.previews, ...previews],
    }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleRemoveImage = (index) => {
    setPhotoFormData((prev) => {
      const newSelectedFiles = prev.selectedFiles.filter((_, i) => i !== index);
      const newPreviews = prev.previews.filter((_, i) => i !== index);
      return {
        ...prev,
        selectedFiles: newSelectedFiles,
        previews: newPreviews,
      };
    });
  };

  return (
    <div className="my-container-form">
  {isLoading && <div className="loading"><LoadingSketch /></div>}
      <h3 className="form-title">UPLOAD COLLECTION PHOTOS</h3>
      <form className="my-form-form">
        <div className="my-form-group-form">
          <label className="my-label-form" htmlFor="Collection">
            COLLECTION
          </label>
          <CustomDropdown
            options={photoFormData.collections.map((collection) => ({
              value: collection.ID,
              label: collection.Name,
            }))}
            value={photoFormData.selectedCollection}
            onChange={handleCollectionChange}
          />
        </div>
        <div className="my-form-group-form">
          <label className="my-label-form" htmlFor="photoName">
            PHOTO IDENTIFIER
          </label>
          <CustomTextInput
            value={photoFormData.photoName}
            onChange={handlePhotoNameChange}
            placeholder="PHOTO NAME"
          />
        </div>
        <div
          className="my-form-group-form"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <label className="my-label-form" htmlFor="Images">
            IMAGES
          </label>
          <input
            className="my-input-form"
            type="file"
            multiple
            accept="image/*"
            onChange={handlePhotoFileChange}
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
              {photoFormData.previews.map((src, index) => (
                <div
                  key={index}
                  style={{
                    position: "relative",
                    display: "inline-block",
                    margin: "5px",
                  }}
                >
                  <img
                    src={src}
                    alt={`Preview ${index}`}
                    style={{ width: "100px", height: "auto", margin: "5px" }}
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveImage(index);
                    }}
                    style={{
                      position: "absolute",
                      top: "0",
                      right: "0",
                      background: "red",
                      color: "white",
                      border: "none",
                      borderRadius: "50%",
                      cursor: "pointer",
                      padding: "2px 6px",
                    }}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <button
          type="button"
          className="my-button-form"
          onClick={handlePhotoUpload}
        >
          POST IMAGES FOR COLLECTION
        </button>
      </form>
    </div>
  );
};

export default UploadCollectionPhotos;
