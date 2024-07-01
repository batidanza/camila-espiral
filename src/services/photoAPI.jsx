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

const uploadPhoto = async (formDataWithFile) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/photo/upload`, {
        method: "POST",
        body: formDataWithFile,
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Photo uploaded successfully:", data);
        return { success: true, data };
      } else {
        console.error("Error uploading photo");
        return { success: false, error: "Error uploading photo" };
      }
    } catch (error) {
      console.error("Error uploading photo:", error);
      return { success: false, error: "Error uploading photo" };
    }
  };

  export { fetchPhoto, getPhotoByCollection, uploadPhoto };