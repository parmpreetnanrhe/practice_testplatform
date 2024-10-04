import React, { useContext, useEffect, useRef, useState } from 'react';
import { Footer } from './Footer';
import { UserInfoAuthContext } from '../contexts/UserInfoContext';
import { Question_heading } from './Question_heading';
import { QuestionDataContext } from '../contexts/QuestionDataContext';
import { decryptPassword } from '../commonFunctions/decryptPassword';

export default function QuestionArea({ questionAreaProps }) {
  const { questionsDataLoaded, currentQuestionNo, handleQuestionClick, palletQuestionBoxData } = questionAreaProps;
  // console.log(currentQuestionNo);

  const currentQuestionIndex = useRef(currentQuestionNo); // useRef, it persists the value across renders without causing a re-render.it will not trigger a re-render when updated.

  const [selectedAnswers, setSelectedAnswers] = useState({}); // Store user Answer Selection
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loadQuestionSts, setLadQuestionSts] = useState(false);
  const [questionText, setQuestionText] = useState();
  const [currentQuesData, setCurrentQuesData] = useState();
 

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
    console.log(currentQuestionIndex.current)
    console.log(dataLoaded.questionId)
    handleQuestionClick(dataLoaded.platformLink, currentQuestionIndexVal);
  }

  // useEffect(() => { 

  useEffect(() => {
    let encodedString = questionsDataLoaded.testData.sectionsData;
    let base64EncodedText = encodedString[0].questions[0].questionText;
    let decodedQuestionText = decryptPassword(atob(base64EncodedText));
    console.log(encodedString[0].questions[0].questionId)

    setQuestionText(decodedQuestionText);
  }, [questionsDataLoaded]);



  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh
    setIsSubmitted(true);
    console.log('Selected Answers: ', selectedAnswers);
    alert('Test Submitted!');
  };





  return (
    <>
      {/* {loadQuestionSts && (
      <SubHeader
        testTimeStarts={testTimeStarts}
        currentQuestionCount={currentQues tionIndex} />
        )} */}
      {/* <Pallet pallteclickdOnQuestion={pallteclickdOnQuestion}
        currentQuestionIndex={currentQuestionIndex} /> */}
      <div className="question-main-container ">
        {questionsDataLoaded && (
          <div className='question-container loading'>
            <Question_heading currentQuestionCount={currentQuestionNo + 1} />
            <form onSubmit={handleSubmit}>
              {questionText && (
                <div className="single-question">
                  <h3>{questionText}</h3>
                  {/* {['A', 'B', 'C', 'D'].map((option) => (
                    <div key={option}>
                      <Input
                        type="radio"
                        id={`${currentQuestionIndex}-${option}`}
                        name={`${currentQuestionIndex}`}
                        // Here we can manage checkbox states as needed
                        checked={selectedAnswers[currentQuestionIndex] === option}
                        onChange={() => handleCheckboxChange(option)}
                      />
                      <label htmlFor={`${currentQuestionIndex}-${option}`}>
                        {`${option}: ${questionsDataLoaded[currentQuestionIndex][option]}`}
                      </label>
                    </div>
                  ))} */}
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
        // totalQuestions={questionsDataLoaded.length}
        />
      </div>
    </>
  );
}
