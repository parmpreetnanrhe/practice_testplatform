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
        <div className="select-pallet-tag">
          <SelectComponent
            options={['All', 'Correct', 'Incorrect', 'Un-attempted', 'Flagged']}
            onSelectChange=""
            defaultText="Please select a value"
          />
        </div>
        <div className='questtion-box-container'>
            <div qid="1" className='ques-box'><span>1</span></div>
            <div qid="2" className='ques-box'><span>2</span></div>
            <div qid="3" className='ques-box'><span>3</span></div>
            <div qid="4" className='ques-box'><span>4</span></div>
        </div>
      </div>
    </>
  )
}
