import React, { useState, useEffect, useRef } from 'react';

const SelectComponent = ({ options, onSelectChange, defaultText = "Select an option" }) => {
  const [selectedValue, setSelectedValue] = useState(defaultText);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    if (onSelectChange) {
      onSelectChange(value); // Pass selected value back to parent component or other logic
    }
  };

  // Handle click on option item
  const handleOptionClick = (option) => {
    setSelectedValue(option); // Update selected value
    setIsOpen(false); // Close the dropdown after selecting an option
  };

  const openDropdown = (event) => {
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside of it
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  // Attach and remove the event listener to handle clicks outside
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="filterDropdown" ref={dropdownRef}>
        <div className='selectedVal' onClick={openDropdown}>{selectedValue}</div>
        {isOpen && (
          <div className="selectItems">
            {options.map((option, index) => (
              <div onClick={() => handleOptionClick(option)} key={index} className="optionItem" value={option}>
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* <select value={selectedValue} onChange={handleChange}>
        <option value="" disabled>{defaultText}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
        {option}
          </option>
        ))}
      </select> */}
      {/* {selectedValue && <p>You selected: {selectedValue}</p>} */}
    </>
  );
};

export default SelectComponent;
