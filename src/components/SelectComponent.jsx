import React, { useState, useEffect, useRef } from "react";

const SelectComponent = ({
  options,
  onSelectChange,
  defaultText = "Select an option",
  className,
}) => {
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

  // Close dropdown when clicking outside of it
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  // Attach and remove the event listener to handle clicks outside
  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

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
            {options.map((option, index) => (
              <div className="selectOptions" key={option.cateId}>
                <h1>{option.label}</h1>
                {option.subCatArr.map((data,index) => (
                  <div
                    onClick={() => handleOptionClick(data)}
                    key={index}
                    className="optionItem"
                    value={data.cateId}
                    link = {data.link}
                  >{data.name}</div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SelectComponent;
