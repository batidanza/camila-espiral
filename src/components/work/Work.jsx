import React, { useState, useEffect } from 'react';
import { fetchCollection, getPhotoByCollection } from '../../services/collectionAPI';
import Collection from './Collection';

const Work = () => {
  const [collections, setCollections] = useState([]);
  const [photos, setPhotos] = useState({});
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState({});
  const [selectedCollectionId, setSelectedCollectionId] = useState(null);

  useEffect(() => {
    const getCollections = async () => {
      const data = await fetchCollection();
      setCollections(data);
      await fetchPhotos(data);
    };

    const fetchPhotos = async (collections) => {
      const photosMap = {};
      for (const collection of collections) {
        const photoData = await getPhotoByCollection(collection.ID);
        if (photoData.length > 0) {
          photosMap[collection.ID] = photoData;
        }
      }
      setPhotos(photosMap);
    };

    getCollections();
  }, []);

  const handleMouseEnter = (collectionId) => {
    if (photos[collectionId] && photos[collectionId].length > 1) {
      setCurrentPhotoIndex((prevState) => ({
        ...prevState,
        [collectionId]: 1,
      }));
    }
  };

  const handleMouseLeave = (collectionId) => {
    setCurrentPhotoIndex((prevState) => ({
      ...prevState,
      [collectionId]: 0,
    }));
  };

  const handleCollectionClick = (collectionId) => {
    setSelectedCollectionId(collectionId);
  };

  const handleBack = () => {
    setSelectedCollectionId(null);
  };

  if (selectedCollectionId) {
    return <Collection collectionId={selectedCollectionId} onBack={handleBack} />;
  }

  return (
    <div className="collections-wrapper">
      {collections.length === 0 ? (
        <p>No collections available</p>
      ) : (
        collections.map((collection) => (
          <div
            key={collection.ID}
            className="collection-container"
            onMouseEnter={() => handleMouseEnter(collection.ID)}
            onMouseLeave={() => handleMouseLeave(collection.ID)}
            onClick={() => handleCollectionClick(collection.ID)}
          >
            <h2>{collection.Name}</h2>
            <p>{collection.Description}</p>
            {photos[collection.ID] && photos[collection.ID].length > 0 && (
              <img
                src={photos[collection.ID][currentPhotoIndex[collection.ID] || 0].Image}
                alt={`Photo for ${collection.Name}`}
              />
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Work;
