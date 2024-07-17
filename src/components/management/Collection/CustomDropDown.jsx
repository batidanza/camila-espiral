import React, { useState } from "react";
import "../FormStyles.css"; // Asegúrate de importar tus estilos CSS aquí

const CustomDropdown = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  // Encontrar el label correspondiente al value seleccionado
  const selectedOption = options.find(option => option.value === value);
  const displayText = selectedOption ? selectedOption.label : "Select an option";

  return (
    <div className="custom-dropdown">
      <div className="dropdown-header" onClick={toggleDropdown}>
        {displayText}
      </div>
      {isOpen && (
        <div className="dropdown-options">
          {options.map((option) => (
            <div
              key={option.value}
              className="dropdown-option"
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
