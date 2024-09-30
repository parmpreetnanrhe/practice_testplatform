import React, { useState } from 'react';

const SelectComponent = ({ options, onSelectChange, defaultText = "Select an option" }) => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    if (onSelectChange) {
      onSelectChange(value); // Pass selected value back to parent component or other logic
    }
  };

  return (
    <div>
      <select value={selectedValue} onChange={handleChange}>
        <option value="" disabled>{defaultText}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      {selectedValue && <p>You selected: {selectedValue}</p>}
    </div>
  );
};

export default SelectComponent;
