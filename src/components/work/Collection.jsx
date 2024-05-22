import React, { useState, useEffect } from 'react';
import { fetchCollectionById, getPhotoByCollection } from '../../services/collectionAPI';

const Collection = ({ collectionId, onBack }) => {
  const [collection, setCollection] = useState(null);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchCollectionDetails = async () => {
      const collectionData = await fetchCollectionById(collectionId);
      setCollection(collectionData);
      const photoData = await getPhotoByCollection(collectionId);
      setPhotos(photoData);
    };

    fetchCollectionDetails();
  }, [collectionId]);

  if (!collection) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <button onClick={onBack}>Back</button>
      <h2>{collection.Name}</h2>
      <p>{collection.Description}</p>
      <div>
        {photos.map(photo => (
          <img key={photo.ID} src={photo.Image} alt={`Photo for ${collection.Name}`} />
        ))}
      </div>
    </div>
  );
};

export default Collection;
