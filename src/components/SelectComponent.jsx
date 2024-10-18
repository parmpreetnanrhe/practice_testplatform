import React, { useState, useEffect, useRef } from "react";

function SelectComponent({
  options,
  onSelectChange,
  defaultText = "Please select a value",
  className,
  selectedCateObj,
  setSelectedCateObj,
}) {
  const [selectedValue, setSelectedValue] = useState(defaultText);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleOptionClick = (selectedObj) => {
    setSelectedValue(selectedObj.subCatName || selectedObj.catName); // Update displayed value
    setIsOpen(false); // Close the dropdown
    setSelectedCateObj(selectedObj);
    if (onSelectChange) {
      onSelectChange(selectedObj);
    }
  };

  const openDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      console.log('mousedown', event.target)
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`filterDropdown ${className}`}
      onClick={openDropdown}
      ref={dropdownRef}
    >
      <div className="selectedVal">{selectedValue}</div>
      {isOpen && (
        <div className="selectItems">
          {options.map((option, index) => (
            <div className="selectOptions" key={option.value}>
              {option.subCatArr && option.subCatArr.length > 0 ? (
                <>
                  <h1>{option.label}</h1>
                  {option.subCatArr.map((data, subIndex) => {
                    const selectedObj = {
                      selectCategory: "selectedCategory",
                      cateId: option.value,
                      subCatName: data.name,
                      payLoadLink: data.link,
                      subCatId: data.cateId,
                    };
                    return (
                      <div
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent triggering parent click
                          handleOptionClick(selectedObj);
                        }}
                        key={subIndex}
                        className="optionItem"
                      >
                        {data.name}
                      </div>
                    );
                  })}
                </>
              ) : (
                <div
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering parent click
                    handleOptionClick({
                      selectCategory: "filter",
                      cateId: selectedCateObj.cateId,
                      subCatName: option.name,
                      payLoadLink: option.link,
                      subCatId: selectedCateObj.subCatId,
                    });
                  }}
                  className="optionItem"
                >
                  {option.name}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default React.memo(SelectComponent);
