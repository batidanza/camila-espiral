const fetchPhoto = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/photo/Photos`);
      if (!response.ok) {
        throw new Error("Error fetching photo");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching photo", error);
      throw error; 
    }
  };

  const getPhotoByCollection = async (collectionId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/photo/byCollection/${collectionId}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(
        `Error fetching photo for collection with ID ${collectionId}:`,
        error
      );
      return [];
    }
  };

  export { fetchPhoto, getPhotoByCollection };