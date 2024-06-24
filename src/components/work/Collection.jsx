import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPhotoByCollection, fetchCollectionById } from '../../services/collectionAPI';
import { initLightboxJS } from 'lightbox.js-react';
import { SlideshowLightbox } from 'lightbox.js-react';
import 'lightbox.js-react/dist/index.css';
import './Collection.css';
import LoadingSketch from '../layout/LoadingSketch';

const Collection = () => {
  const { id } = useParams();
  const [photos, setPhotos] = useState([]);
  const [collection, setCollection] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    initLightboxJS("Insert your License Key here", "Insert plan type here");
  }, []);

  useEffect(() => {
    const fetchPhotosAndCollection = async () => {
      try {
        const [photoData, collectionData] = await Promise.all([
          getPhotoByCollection(id),
          fetchCollectionById(id)
        ]);
        setPhotos(photoData);
        setCollection(collectionData);
      } catch (error) {
        setError('Error fetching data');
      }
    };

    fetchPhotosAndCollection();
  }, [id]);

  if (!collection || !photos.length) return <LoadingSketch />; // Renderiza el sketch de loading mientras se carga la colección y las fotos
  if (error) return <p>{error}</p>;

  return (
    <div className="collection-container">
      <br />
      <h1 className="title">{collection.Name || 'Collection'}</h1>
      <br />
      <div className="artworks">
        <div className="columns-container">
          {Array.from({ length: 2 }).map((_, columnIndex) => (
            <div className="column" key={columnIndex}>
              {photos
                .filter((_, index) => index % 2 === columnIndex)
                .map((photo) => (
                  <div className="artwork-container" key={photo.ID}>
                    <div className="artwork">
                      <SlideshowLightbox>
                        <img 
                          src={photo.Image} 
                          alt={`Photo ${photo.ID}`} 
                          className="artwork-image"
                        />
                      </SlideshowLightbox>
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
