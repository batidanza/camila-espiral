import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CollectionCarroussel.css';
import { fetchCollection } from '../../services/collectionAPI';
import LoadingSketch from '../layout/LoadingSketch';

const CollectionCarroussel = () => {
  const [photos, setPhotos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [hovered, setHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchPhotos = async () => {
      setIsLoading(true);
      try {
        const data = await fetchCollection();
        const sortedPhotos = data.sort((a, b) => a.Position - b.Position);
        setPhotos(sortedPhotos);
      } catch (error) {
        console.error('Error fetching photos:', error);
      } finally {
        setIsLoading(false);
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
    <div className="carrousel-container">
      {isLoading && (
        <div className="loading">
          <LoadingSketch />
        </div>
      )}
      <div className="carrousel">
        <button className="prev" onClick={prevSlide}>&#10094;</button>
        <div className="carrousel-inner" style={{ transform: `translateX(-${currentIndex * (isMobile ? 100 : 40)}%)` }}>
          {photos.map((photo, index) => (
            <Link to={`/collection/${photo.ID}`} key={photo.ID} className={`carrousel-item ${index === currentIndex ? 'active' : ''}`}>
              <img
                className={`carroussel-img ${hovered ? 'separator-cursor' : ''}`}
                src={photo.Image}
                alt={photo.alt}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              />
            </Link>
          ))}
        </div>
        <button className="next" onClick={nextSlide}>&#10095;</button>
      </div>
    </div>
  );
};

export default CollectionCarroussel;
