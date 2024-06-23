import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPhotoByCollection, fetchCollectionById } from '../../services/collectionAPI';
import './Collection.css'

const Collection = () => {
  const { id } = useParams();
  const [photos, setPhotos] = useState([]);
  const [collection, setCollection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      } finally {
        setLoading(false);
      }
    };

    fetchPhotosAndCollection();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="collection-container">
      <br />
      <h1 className="title">{collection.Name || 'Collection'}</h1>
      <br />
      <div className="artworks">
        <div className="columns-container">
          {photos && Array.from({ length: Math.ceil(photos.length / 2) }).map((_, columnIndex) => (
            <div className="column" key={columnIndex}>
              {photos
                .filter((_, index) => index % 2 === columnIndex)
                .map((photo) => (
                  <Link to={`/photo/${photo.ID}`} key={photo.ID}>
                    <div className="artwork-container" key={photo.ID}>
                      <div className="artwork">
                        <img className="artwork-image" src={photo.Image} alt={`Photo ${photo.ID}`} />
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
