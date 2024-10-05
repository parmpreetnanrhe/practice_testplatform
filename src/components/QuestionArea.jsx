import React, { useContext, useEffect, useRef, useState } from 'react';
import { Footer } from './Footer';
import { UserInfoAuthContext } from '../contexts/UserInfoContext';
import { Question_heading } from './Question_heading';
import { QuestionDataContext } from '../contexts/QuestionDataContext';
import { decryptPassword } from '../commonFunctions/decryptPassword';
import Input from './Input';
import SubHeader from './SubHeader';

export default function QuestionArea({ questionAreaProps }) {
  const { questionsDataLoaded, currentQuestionNo, handleQuestionClick, palletQuestionBoxData, questionAreaVisible } = questionAreaProps;
  // console.log(currentQuestionNo);

  const currentQuestionIndex = useRef(currentQuestionNo); // useRef, it persists the value across renders without causing a re-render.it will not trigger a re-render when updated.

  const [selectedAnswers, setSelectedAnswers] = useState({}); // Store user Answer Selection
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loadQuestionSts, setLadQuestionSts] = useState(false);
  const [questionText, setQuestionText] = useState();
  const [currentQuesData, setCurrentQuesData] = useState();
  const [questionsOptionsArr, setquestionsOptionsArr] = useState([]);
  // State to manage visibility of SecondComponent
  const [isVisible, setIsVisible] = useState(false);
  const [isStrikeItems, setIsStrike] = useState({});

  // Toggle the visibility of SecondComponent
  const handleToggleVisibility = () => {
    setIsVisible(!isVisible);
    setIsStrike(Array());
  };

  const setStrike = (index) => {
    const newVisibleItems = [...isStrikeItems];
    // If the item is already visible, hide it. Otherwise, make it visible and keep other items visible.
    newVisibleItems[index] = !newVisibleItems[index];
    setIsStrike(newVisibleItems);
  }

  const handleNextClick = () => {
    if (currentQuestionIndex.current < palletQuestionBoxData.length - 1) {
      currentQuestionIndex.current += 1;
      updateQuestionData(currentQuestionIndex.current);
    }
  };

  const handlePreviousClick = () => {
    if (currentQuestionIndex.current > 0) {
      currentQuestionIndex.current -= 1;
      updateQuestionData(currentQuestionIndex.current);
    }
  };

  const updateQuestionData = (currentQuestionIndexVal) => {
    const dataLoaded = palletQuestionBoxData[currentQuestionIndexVal];
    setCurrentQuesData(dataLoaded);
    console.log(questionsDataLoaded)
    console.log(currentQuestionIndex.current)
    console.log(dataLoaded.questionId)
    handleQuestionClick(dataLoaded.platformLink, currentQuestionIndexVal);
  }


  useEffect(() => {
    if (questionsDataLoaded && questionsDataLoaded.testData && questionsDataLoaded.testData.sectionsData) {
      let encodedString = questionsDataLoaded.testData.sectionsData;
      let quesArray = encodedString[0].questions[0];
      let base64EncodedText = quesArray.questionText;
      let questionsOptionsArr = quesArray.questionsOptions;
      let decodedQuestionText = decryptPassword(atob(base64EncodedText));
      console.log(encodedString[0].questions[0].questionId);
      setQuestionText(decodedQuestionText);
      setquestionsOptionsArr(questionsOptionsArr); 
      console.log(questionsOptionsArr)
    }
  }, [questionsDataLoaded]);



  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh
    setIsSubmitted(true);
    console.log('Selected Answers: ', selectedAnswers);
    alert('Test Submitted!');
  };

  const handleCheckboxChange = (option) => {
    setSelectedAnswers((prevState) => ({
      ...prevState,
      [currentQuestionNo]: option,
    }));
  };

  const convertToLetter = (num) => {
    return String.fromCharCode(64 + num); // 'A' starts at 65 in ASCII
  };





  return (
    <>
    <SubHeader />
      <div className="question-main-container">
        {questionText && (
          <div className={`question-container ${!questionAreaVisible ? 'loading' : ""} `}>
            <Question_heading onClick={handleToggleVisibility} currentQuestionCount={currentQuestionNo + 1} />
            <form onSubmit={handleSubmit}>
              {questionText && (
                <div className="single-question">
                  <h3>{questionText}</h3>
                  {questionsOptionsArr[0].map((option,index) => (
                    <div className='quesOptions'>
                      <label className={`quesOpt ${!questionAreaVisible ? 'loading' : ""}`} htmlFor={`${index+1}-${currentQuestionNo}`} key={option}>
                        {isStrikeItems[index] && isVisible && (
                          <div className='optStrike'></div>
                        )}
                        <div className='perseusInteractive'>
                          <Input
                            type="radio"
                            id={`${index+1}-${currentQuestionNo}`}
                            name={`${currentQuestionNo}`}
                            // Here we can manage checkbox states as needed
                            value={index+1}
                            checked={selectedAnswers[currentQuestionNo] === index+1 && !isStrikeItems[index]}
                            onChange={() => handleCheckboxChange(index+1)}
                          />
                          <span className='iconWrapper'>{convertToLetter(index+1)}</span>
                        </div>
                        <span className='optionTxt'>
                          {decryptPassword(atob(option))}
                        </span>
                      </label>
                      {isVisible && (
                        <div className='optDisabled' onClick={()=>setStrike(index)}>
                          <span className='iconWrapper'>{convertToLetter(index+1)}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </form>
          </div>
        )}
      </div>
      <div>
        <Footer
          onPrevious={handlePreviousClick}
          onNext={handleNextClick}
          currentQuestionIndex={currentQuestionIndex}
        // totalQuestions={questionData.length} 
        // totalQuestions={questionsDataLoaded.length}
        />
      </div>
    </>
  );
}
