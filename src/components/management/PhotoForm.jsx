import React, { useState, useEffect } from 'react';
import { uploadPhoto } from '../../services/photoAPI';
import { fetchCollection } from '../../services/collectionAPI';

const PhotoForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const data = await fetchCollection();
        if (data) {
          setCollections(data);
        } else {
          console.error('Error fetching collections: data is undefined');
        }
      } catch (error) {
        console.error('Error fetching collections:', error);
      }
    };

    fetchCollections();
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleCollectionChange = (event) => {
    setSelectedCollection(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleUpload = async () => {
    try {
      if (!selectedFile) {
        console.error('No file selected');
        return;
      }
  
      const formData = new FormData();
      formData.append('Image', selectedFile);
      formData.append('CollectionID', selectedCollection);
      formData.append('Name', name);
  
      const response = await uploadPhoto(formData);
      if (response.success) {
        console.log('Media uploaded successfully:', response.data);
        alert('Media uploaded successfully');
      } else {
        console.error('Error uploading media:', response.error);
        alert('Error uploading media');
      }
    } catch (error) {
      console.error('Error uploading media:', error);
      alert('Error uploading media');
    }
  };
  
  console.log(collections)

  return (
    <div className="uploader-container">
      <select value={selectedCollection} onChange={handleCollectionChange}>
        <option value="">Select a collection</option>
        {collections.map((collection) => (
          <option key={collection.ID} value={collection.ID}>
            {collection.Name}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={name}
        name='Name'
        onChange={handleNameChange}
        placeholder="Name of the photo"
      />
      <input className="file-input" type="file" onChange={handleFileChange} />
      <button className="upload-button" onClick={handleUpload}>
        Upload images for this product
      </button>
    </div>
  );
};

export default PhotoForm;
