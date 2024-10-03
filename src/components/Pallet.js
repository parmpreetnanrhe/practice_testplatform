import React, { useContext, useEffect, useState } from 'react'
import { Button } from './Button'
import SelectComponent from './SelectComponent';
import { PracticeQuesPallet } from '../contexts/PracticeQuesPalletContext';

export default function Pallet({ pallteclickdOnQuestion, currentQuestionIndex }) {
  const [isPalletOpen, setIsPalletOpen] = useState(false);
  const [categoryNamesArray, setCategoryNamesArray] = useState([]);
  const [questionsData, setQuestionData] = useState({});
  const palletData = useContext(PracticeQuesPallet);

  const togglePanel = () => {
    setIsPalletOpen(!isPalletOpen);
  };
  useEffect(() => {
    setQuestionData(palletData.questionsData);
    setCategoryNamesArray(palletData.categoryNamesArray);
    console.log(questionsData)
    console.log(categoryNamesArray)

  }, [palletData])

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
          {questionsData.length > 0 && (
            questionsData.map((queData, index) => (
              <div key={queData.questionId}
                className={`ques-box ${queData.questionNo == currentQuestionIndex ? "quesActive" : ""}`}
                onClick={() => pallteclickdOnQuestion(queData.questionNo)}><span>{queData.questionNo}</span></div>
            )
              // <div qid="1" className='ques-box'><span>1</span></div>
            ))}

        </div>
      </div>
    </>
  )
}
