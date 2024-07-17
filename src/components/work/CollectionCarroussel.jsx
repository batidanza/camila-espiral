import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Importar Link desde react-router-dom
import './CollectionCarroussel.css';
import { fetchCollection } from '../../services/collectionAPI';

const CollectionCarroussel = () => {
  const [photos, setPhotos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const data = await fetchCollection();
        const sortedPhotos = data.sort((a, b) => a.Position - b.Position);
        setPhotos(sortedPhotos);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };

    fetchPhotos();
  }, []);

  const prevSlide = () => {
    const lastIndex = photos.length - 1;
    const index = currentIndex === 0 ? lastIndex : currentIndex - 1;
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    const lastIndex = photos.length - 1;
    const index = currentIndex === lastIndex ? 0 : currentIndex + 1;
    setCurrentIndex(index);
  };

  return (
    <div className="carrousel">
      <button className="prev" onClick={prevSlide}>&#10094;</button>
      <div className="carrousel-inner" style={{ transform: `translateX(-${currentIndex * 50}%)` }}>
        {photos.map((photo, index) => (
          <Link to={`/collection/${photo.ID}`} key={photo.ID} className={`carrousel-item ${index === currentIndex ? 'active' : ''}`}>
            <img className='carroussel-img' src={photo.Image} alt={photo.alt} />
          </Link>
        ))}
      </div>
      <button className="next" onClick={nextSlide}>&#10095;</button>
    </div>
  );
};

export default CollectionCarroussel;
