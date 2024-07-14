// collectionAPI.jsx
export const fetchCollection = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/collection/collection`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching collection:", error);
    return [];
  }
};

export const getPhotoByCollection = async (collectionId) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/photo/byCollection/${collectionId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching photo for collection with ID ${collectionId}:`, error);
    return [];
  }
};

export const fetchCollectionById = async (id) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/collection/collection/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching collection with ID ${id}:`, error);
    return null;
  }
};

export const createCollection = async (formDataWithFile) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/collection/create-collection`, {
      method: "POST",
      body: formDataWithFile,
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Media uploaded successfully:", data);
      return { success: true, data };
    } else {
      console.error("Error uploading media");
      return { success: false, error: "Error uploading media" };
    }
  } catch (error) {
    console.error("Error uploading media:", error);
    return { success: false, error: "Error uploading media" };
  }
};

export const createMl= async (formDataWithFile) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/collection/create-ml`, {
      method: "POST",
      body: formDataWithFile,
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Media uploaded successfully:", data);
      return { success: true, data };
    } else {
      console.error("Error uploading media");
      return { success: false, error: "Error uploading media" };
    }
  } catch (error) {
    console.error("Error uploading media:", error);
    return { success: false, error: "Error uploading media" };
  }
};

export const fetchMl = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/collection/get-ml`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching collection:", error);
    return [];
  }
};

export const swapCollectionIds = async (firstPhotoId, secondPhotoId) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/collection/collections/swap`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstPhotoId, secondPhotoId }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al intercambiar posiciones de fotos: ${errorText}`);
    }

    const data = await response.json();
    console.log("Photo positions swapped successfully:", data);
    return { success: true, data };
  } catch (error) {
    console.error("Error swapping photo positions:", error);
    return { success: false, error: error.message };
  }
};