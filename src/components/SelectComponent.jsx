import React, { useState, useEffect, useRef } from "react";

function SelectComponent ({options,onSelectChange,defaultText = "Select an option",className,}) { 
 
  const [selectedValue, setSelectedValue] = useState(defaultText);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Handle click on option item
  const handleOptionClick = (data) => {
    setSelectedValue(data.name); // Update displayed value (label)
    setIsOpen(false); // Close the dropdown
    if (onSelectChange) {
      onSelectChange(data.link); // Pass the selected value to parent or other logic
    }
  };

  const openDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <div
        className={`filterDropdown ${className}`}
        onClick={openDropdown}
        ref={dropdownRef}
      >
        <div className="selectedVal">{selectedValue}</div>
        {isOpen && (
          <div className="selectItems">
            {options.map((option, index) => {
              // Check if the subCatArr exists and has items
              if (option.subCatArr && option.subCatArr.length > 0) {
                return (
                  <div className="selectOptions" key={option.cateId}>
                    <h1>{option.label}</h1>
                    {option.subCatArr.map((data, subIndex) => (
                      <div
                        onClick={() => handleOptionClick(data)}
                        key={subIndex}
                        className="optionItem"
                        value={data.cateId}
                        link={data.link}
                      >
                        {data.name}
                      </div>
                    ))}
                  </div>
                );
              } else {
                // Render this if subCatArr is empty or doesn't exist
                return (
                  <div className="selectOptions" key={option.cateId}> 
                    <div className="optionItem" key={index}>
                      {option.label}
                    </div>
                  </div>
                );
              }
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default React.memo(SelectComponent);
