import React, { useState, useEffect } from "react";
import { uploadArchivePhoto, fetchArchive } from "../../../services/ArchiveAPI";
import "../FormStyles.css";
import CustomDropdown from "../FormComponents/CustomDropDown.jsx";
import CustomTextInput from "../FormComponents/CustomTextInput.jsx";
import LoadingSketch from "../../layout/LoadingSketch";

const UploadArchivePhotos = () => {
  const [photoFormData, setPhotoFormData] = useState({
    selectedFiles: [],
    selectedCollection: "",
    archiveName: "",
    previews: [],
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

  const handleCollectionChange = (selectedCollection) => {
    setPhotoFormData({ ...photoFormData, selectedCollection });
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
    setPhotoFormData({ ...photoFormData, archiveName: e });
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
        formData.append("ArchiveName", photoFormData.archiveName);

        const response = await uploadArchivePhoto(formData);
        if (response.success) {
          console.log("Media uploaded successfully:", response.data);
        } else {
          console.error("Error uploading media:", response.error);
        }
      }

      alert("Media uploaded successfully");

      const updatedCollections = await fetchArchive();
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
      <h3 className="form-title">UPLOAD ARCHIVE PHOTOS</h3>
      <form className="my-form-form">
        <div className="my-form-group-form">
          <label className="my-label-form" htmlFor="Collection">
            ARCHIVE ID
          </label>
          <CustomDropdown
            options={collections.map((collection) => ({
              value: collection.ID,
              label: collection.Name,
            }))}
            value={photoFormData.selectedCollection}
            onChange={handleCollectionChange}
          />
        </div>
        <div className="my-form-group-form">
          <label className="my-label-form" htmlFor="archiveName">
            ARCHIVE NAME
          </label>
          <CustomTextInput
            value={photoFormData.archiveName}
            onChange={handlePhotoNameChange}
            placeholder="ARCHIVE NAME"
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
                    onClick={() => handleRemoveImage(index)}
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
              ))}
              {photoFormData.previews.length === 0 && (
                <p>Drop images or click to select them</p>
              )}
            </div>
          </div>
        </div>
        <button
          type="button"
          className="my-button-form"
          onClick={handlePhotoUpload}
        >
          UPLOAD
        </button>
      </form>
    </div>
  );
};

export default UploadArchivePhotos;
