
export const loginUser = async (username, password) => {
    const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }
  
    return response.json();
  };
  
  // Función para crear un nuevo usuario
  export const createUser = async (userData) => {
    const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/user/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }
  
    return response.json();
  };
  