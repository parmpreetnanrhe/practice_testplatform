import React, { useState } from 'react'
import { Button } from './Button'
import SelectComponent from './SelectComponent';

export default function Pallet() {
  const [isPalletOpen, setIsPalletOpen] = useState(false);

  const togglePanel = () => {
    setIsPalletOpen(!isPalletOpen);
  };

  return (
    <>
      <div className={`pallet-button ${isPalletOpen ? 'pallet-button-move' : ''}`}>
        <Button 
          type="button"
          title="Expand"
          className="right-button"
          text="<"
          onClick={togglePanel} ></Button>
      </div>
      <div className={`side-panel ${isPalletOpen ? 'open' : ''}`}>
        <SelectComponent
          options={['All', 'Correct', 'Incorrect', 'Un-attempted', 'Flagged']}
          onSelectChange=""
          defaultText="Please select a value"
        />
      </div>
    </>
  )
}
