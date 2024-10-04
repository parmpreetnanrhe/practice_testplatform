import React, { useContext, useEffect, useState } from 'react';
import { questionData } from '../questionsData';
import Input from './Input';
import { Footer } from './Footer';
import { Button } from './Button';
import { UserInfoAuthContext } from '../contexts/UserInfoContext';
import Pallet from './Pallet';
import SubHeader from './SubHeader';
import { Question_heading } from './Question_heading';

export default function QuestionArea({ testTimeStarts }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // Store user Answer Selection
  const [isSubmitted, setIsSubmitted] = useState(false);

  const checkUserAuth = useContext(UserInfoAuthContext);


  const handleNextClick = () => {
    setCurrentQuestionIndex((prevIndex) => Math.min(prevIndex + 1, questionData.length - 1));
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
    checkUserAuth.isUserLogin();
    if (checkUserAuth.userInfo == true) {
      fetch("https://api.github.com/users")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });
    } else {
      // alert("userLogout");
    }
  }, [checkUserAuth.userInfo]);

  return (
    <>
      <SubHeader 
      testTimeStarts={testTimeStarts}
      currentQuestionCount={currentQuestionIndex + 1} />
      <div className="question-main-container">
        <div className='question-container'>
        <Question_heading  currentQuestionCount={currentQuestionIndex + 1}/>
        <form onSubmit={handleSubmit}>
          {questionData.length > 0 && (
            <div className="single-question">
              <h3>{questionData[currentQuestionIndex].question}</h3>
              {['A', 'B', 'C', 'D'].map((option) => (
                <label className="quesOpt" htmlFor={`${currentQuestionIndex}-${option}`} key={option}>
                  <div className='perseusInteractive'>
                    <Input
                      type="radio"
                      id={`${currentQuestionIndex}-${option}`}
                      name={`${currentQuestionIndex}`}
                      // Here we can manage checkbox states as needed
                      checked={selectedAnswers[currentQuestionIndex] === option}
                      onChange={() => handleCheckboxChange(option)}
                    />
                    <span className='iconWrapper'>{option}</span>
                  </div>
                  <span className='optionTxt'>
                    {`${questionData[currentQuestionIndex][option]}`}
                  </span>
                </label>
              ))}
            </div>
          )}
        </form>
        </div>
      </div>
      <div>
        <Footer
          onPrevious={handlePreviousClick}
          onNext={handleNextClick}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={questionData.length} 
        />
      </div>
      <Pallet pallteclickdOnQuestion={pallteclickdOnQuestion}
      currentQuestionIndex={currentQuestionIndex} />
    </>
  );
}
