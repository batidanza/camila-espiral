import React, { useState } from 'react';
import { createMl } from '../../services/collectionAPI.jsx'
import './FormStyles.css';

const CollectionForm = () => {
  const [formData, setFormData] = useState({
    Image: '',
    Description: '',
  });

  const handleChange = (e) => {
    if (e.target.type === 'file') {
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('formData before submission:', formData);
    const formDataToSubmit = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      formDataToSubmit.append(key, value);
    });

    const apiResponse = await createMl(formDataToSubmit);

    if (apiResponse.success) {
      console.log(apiResponse.data);
      alert('Collection created');
    } else {
      console.error('Error creating collection:', apiResponse.error);
    }
  };

  return (
    <div className="my-container-form">
      <h3 className="form-title"> CREATE COLLECTION</h3>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="my-form-form">


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
  );
};

export default CollectionForm;
