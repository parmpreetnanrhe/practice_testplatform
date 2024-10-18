import React, { useState, useEffect, useRef } from "react";

function SelectComponent({
  options,
  onSelectChange,
  defaultText = "Please select a value",
  className,
  selectedCateObj,
  setSelectedCateObj
}) {
  const [selectedValue, setSelectedValue] = useState(defaultText);

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const handleOptionClick = (selectedObj) => {
    setSelectedValue(selectedObj.catName); // Update displayed value (label)
    setIsOpen(false); // Close the dropdown
    setSelectedCateObj(selectedObj);
    if (onSelectChange) { 
      onSelectChange(selectedObj)
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
                const cateId = option.value;
                return (
                  <div className="selectOptions" key={option.value}>
                    <h1>{option.label}</h1>
                    {option.subCatArr.map((data, subIndex) => {
                      const selectedObj = {
                        selectCategory: "selectedCategory",
                        cateId: cateId,
                        subCatName: data.name,
                        payLoadLink:data.link,
                        subCatId:data.cateId,
                      };
                      return (
                        <div
                          onClick={(e) => handleOptionClick(selectedObj)}
                          key={subIndex}
                          className="optionItem" 
                        >
                          {data.name}
                        </div>
                      );
                    })}
                  </div>
                );
              } else {
                // Render this if subCatArr is empty or doesn't exist
                const selectedObj = {
                  selectCategory: "filter", 
                  cateId: selectedCateObj.cateId,
                  subCatName: option.name,
                  payLoadLink:option.link, 
                  subCatId:selectedCateObj.subCatId,
                };
                return (
                  <div className="selectOptions" key={index}>
                    <div
                      onClick={(e) => handleOptionClick(selectedObj)}
                      className="optionItem"
                      key={index}
                      link={option.link}
                      name="filter"
                    >
                      {option.name}
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
}

export default React.memo(SelectComponent);
