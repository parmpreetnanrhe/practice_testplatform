import React, { useState, useEffect, useRef } from 'react';

const SelectComponent = ({ options, onSelectChange, defaultText = "Select an option" }) => {
  const [selectedValue, setSelectedValue] = useState(defaultText);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Handle click on option item
  const handleOptionClick = (option) => {
    setSelectedValue(option.label); // Update displayed value (label)
    setIsOpen(false); // Close the dropdown
    if (onSelectChange) {
      onSelectChange(option.value); // Pass the selected value to parent or other logic
    }
  };

  const openDropdown = () => {
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
      <div className="filterDropdown" onClick={openDropdown} ref={dropdownRef}>
        <div className="selectedVal" >
          {selectedValue}
        </div>
        {isOpen && (
          <div className="selectItems">
            {options.map((option, index) => (
              <div
                onClick={() => handleOptionClick(option)}
                key={index}
                className="optionItem"
                value={option.value}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SelectComponent;
