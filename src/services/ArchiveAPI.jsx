// ARCHIVE SERVICES


export const fetchArchive = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/archive/archives`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching collection:", error);
    return [];
  }
};

export const fetchArchivenById = async (id) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/archive/archive/${id}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching collection with ID ${id}:`, error);
    return null;
  }
};

export const createArchive = async (formDataWithFile) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/archive/create-archive`,
      {
        method: "POST",
        body: formDataWithFile,
      }
    );

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


// ARCHIVE PHOTOS SERVICES


export const fetchArchivePhoto = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/archive-photos/archive-photos`
    );
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

export const uploadArchivePhoto = async (formDataWithFile) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/archive-photo/create-archive-photo`,
      {
        method: "POST",
        body: formDataWithFile,
      }
    );

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
 
export const getPhotoByArchive = async (archiveName) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/archive-photo/byArchive/${archiveName}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(
      `Error fetching photo for archive with name ${archiveName}:`,
      error
    );
    return [];
  }
};
