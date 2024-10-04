import React, { useContext, useEffect, useState } from 'react'
import { Button } from './Button'
import SelectComponent from './SelectComponent';
import { PracticeQuesPallet } from '../contexts/PracticeQuesPalletContext';
import QuestionArea from './QuestionArea';
import { FetchQuestionDataApi } from '../apis/FetchQuestionDataApi';
import FullScreenLoader from './modalComponent/FullScreenLoader';

export default function Pallet({ }) {
  const [questionsDataLoaded, setQuestionsDataLoaded] = useState([]); 
  const [currentQuestionNo, setCurrentQuestionNo] = useState(0); 
  const [categoryNamesArray, setCategoryNamesArray] = useState([]);
  const [palletQuestionBoxData, setPalletQuestionBoxData] = useState([]);
  const [questionAreaVisible, setQuestionAreaVisible] = useState(false);
  const [showScreenLoader, setShowScreenLoader] = useState(true)
  const [isPalletOpen, setIsPalletOpen] = useState(true);

  // pallet data coming from context
  const palletData = useContext(PracticeQuesPallet);
  const pQuesData = palletData.palletQueData;


  const optionsArray = ['All', 'Correct', 'Incorrect', 'Un-attempted', 'Flagged'];
  const options2 = optionsArray.map((option, index) => ({
    value: index,
    label: option
  }));

  const togglePanel = () => {
    setIsPalletOpen(!isPalletOpen);
  };

  // Fetch question data when a question-box is clicked
  const handleQuestionClick = async (platformLink, questionNo) => {
    setIsPalletOpen(false); 
    setQuestionAreaVisible(false);
    await FetchQuestionDataApi(platformLink, questionNo)
      .then(data => {
        setQuestionsDataLoaded(data);
        setCurrentQuestionNo(questionNo);
        setQuestionAreaVisible(true);  
        setShowScreenLoader(false);
      }).catch(error => console.error('Error fetching question data:', error));
  }

  useEffect(() => {
    setPalletQuestionBoxData(pQuesData.questionsData);
    if (pQuesData && pQuesData.categoryNamesArray) {
      const categoriesWithSubCats = pQuesData.categoryNamesArray.filter(category =>
        category.subCats && category.subCats.length > 0
      );
      const categories = categoriesWithSubCats.map((data) => ({
        value: data.cateId,
        label: data.name,
      }));
      setCategoryNamesArray(categories);
    }
  }, [pQuesData])


  return ( 
    <>
      
      <QuestionArea questionAreaProps={{ questionsDataLoaded, currentQuestionNo, handleQuestionClick, palletQuestionBoxData,questionAreaVisible }} />
    
      {(showScreenLoader) &&  <FullScreenLoader text={questionAreaVisible ? "Please wait while we are loading..." : ""} />}

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
            options={categoryNamesArray}
            onSelectChange=""
            defaultText="Please select a value"
          />
          <SelectComponent
            options={options2}
            onSelectChange=""
            defaultText="Please select a value"
          />
        </div>
        <div className='question-box-container'>
          {palletQuestionBoxData && palletQuestionBoxData.length > 0 && (
            palletQuestionBoxData.map((queData, index) => (
              <div key={queData.questionId}
                className={`ques-box ${((queData.questionNo - 1) == currentQuestionNo && questionAreaVisible) ? "quesBoxDisabled" : ""}`}
                onClick={() => handleQuestionClick(queData.platformLink, (queData.questionNo - 1))}><span>{queData.questionNo}</span></div>
            )
            ))}
        </div>
      </div>
    </>
  )
}
