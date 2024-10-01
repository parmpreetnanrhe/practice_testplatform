import React, { useContext, useState } from 'react'
import { Button } from './Button'
import SelectComponent from './SelectComponent';
import { QuestionDataContext } from '../contexts/QuestionDataContext';

export default function Pallet({ pallteclickdOnQuestion, currentQuestionIndex }) {
  const [isPalletOpen, setIsPalletOpen] = useState(false);
  const getQuestionDataContext = useContext(QuestionDataContext);
 
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
          onClick={togglePanel} >
          <img
            src={`${process.env.PUBLIC_URL}/img/whitebackicon.svg`}
            style={isPalletOpen ? { transform: 'rotate(539deg)' } : {}}
            alt="Arrow Icon"
          />
        </Button>
      </div>
      <div className={`side-panel ${isPalletOpen ? 'open' : ''}`}>
        <div className="select-pallet-tag">
          <SelectComponent
            options={['Section 1', 'Section 2']}
            onSelectChange=""
            defaultText="Please select a value"
          />
          <SelectComponent
            options={['All', 'Correct', 'Incorrect', 'Un-attempted', 'Flagged']}
            onSelectChange=""
            defaultText="Please select a value"
          />
        </div>
        <div className='question-box-container'>
          {getQuestionDataContext.questionDatainfo.length > 0 && (
            getQuestionDataContext.questionDatainfo.map((qid, index) => (
              <div  key={index} 
              className={`ques-box ${index === currentQuestionIndex ? "quesActive" : ""}`} 
              onClick={() => pallteclickdOnQuestion(index)}><span>{index + 1}</span></div>
            )
              // <div qid="1" className='ques-box'><span>1</span></div>
            ))}

        </div>
      </div>
    </>
  )
}
