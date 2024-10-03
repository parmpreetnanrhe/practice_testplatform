import React, { useContext, useEffect, useState } from 'react';
// import { questionsDataLoaded } from '../questionsData';
import Input from './Input';
import { Footer } from './Footer';
import { UserInfoAuthContext } from '../contexts/UserInfoContext';
import Pallet from './Pallet';
import SubHeader from './SubHeader';
import { Question_heading } from './Question_heading';
import { QuestionDataContext } from '../contexts/QuestionDataContext';


export default function QuestionArea({ questionsDataLoaded }) { 
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // Store user Answer Selection
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loadQuestionSts,setLadQuestionSts] = useState(false);

  const checkUserAuth = useContext(UserInfoAuthContext);
  const getQuestionDataContext = useContext(QuestionDataContext); 

  const handleNextClick = () => {
    setCurrentQuestionIndex((prevIndex) => Math.min(prevIndex + 1, questionsDataLoaded.length - 1));
  };

  const handlePreviousClick = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const pallteclickdOnQuestion = (quesNo) => {
    setCurrentQuestionIndex(quesNo);
  }

  const handleCheckboxChange = (option) => {
    setSelectedAnswers((prevState) => ({
      ...prevState,
      [currentQuestionIndex]: option,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh
    setIsSubmitted(true);
    console.log('Selected Answers: ', selectedAnswers);
    alert('Test Submitted!');
  };
 
  useEffect(() => {
    let encodedString = questionsDataLoaded.testData.sectionsData;

    console.log(encodedString);
    // const decoded = atob(encodedString); 
  }, [questionsDataLoaded]);  
 
  return (
    <>
    {/* {loadQuestionSts && (
      <SubHeader
        testTimeStarts={testTimeStarts}
        currentQuestionCount={currentQues tionIndex} />
        )} */}
      {/* <Pallet pallteclickdOnQuestion={pallteclickdOnQuestion}
        currentQuestionIndex={currentQuestionIndex} /> */}
      <div className="question-main-container">
      {questionsDataLoaded && (
        <div className='question-container'>
          <Question_heading currentQuestionCount={currentQuestionIndex} />
          <form onSubmit={handleSubmit}>
            {questionsDataLoaded.length > 0 && (
              <div className="single-question">
                <h3>{questionsDataLoaded[currentQuestionIndex].question}</h3>
                {['A', 'B', 'C', 'D'].map((option) => (
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
          // totalQuestions={questionsDataLoaded.length}
        />
      </div>
    </>
  );
}
