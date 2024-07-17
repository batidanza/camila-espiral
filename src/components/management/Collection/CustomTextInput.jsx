import React from "react";
import "../FormStyles.css"; // Asegúrate de importar tus estilos CSS aquí

const CustomTextInput = ({ value, onChange, placeholder }) => {
  const handleChange = (e) => {
    if (e && e.target && e.target.value !== undefined) {
      onChange(e.target.value);
    } else {
      console.error("Invalid event or event target in handleChange");
    }
  };

  return (
    <input
      type="text"
      className="custom-text-input" // Asegúrate de usar la clase correcta aquí
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
};

export default CustomTextInput;
