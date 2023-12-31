export const fetchSketchData = async () => {
  try {
    const response = await fetch("http://localhost:3002/artworks/sketches");
    const data = await response.json();
    console.log("Sketch Data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching sketch data:", error);
    return [];
  }
};

export const createSketch = async (formData) => {
  try {
    const response = await fetch(
      "http://localhost:3002/artworks/createSketch",
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      const responseData = await response.json();
      return { success: true, message: responseData.message };
    } else {
      const errorData = await response.json();
      return { success: false, error: errorData.error };
    }
  } catch (error) {
    console.error("Error al enviar la solicitud:", error);
    return { success: false, error: "Error al enviar la solicitud" };
  }
};