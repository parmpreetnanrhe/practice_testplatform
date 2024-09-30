import React, { useState } from 'react';
import { questionData } from '../questionsData';
import Input from './Input';
import { Footer } from './Footer';
import { Button } from './Button'; 

export default function QuestionArea() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleNextClick = () => {
    console.log("click NEXT");
    setCurrentQuestionIndex((prevIndex) => Math.min(prevIndex + 1, questionData.length - 1));
  };

  const handlePreviousClick = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  return (
    <div className="question-container">
      {questionData.length > 0 && (
        <div className="single-question">
          <h3>{currentQuestionIndex}{questionData[currentQuestionIndex].question}</h3>
          {['A', 'B', 'C', 'D'].map((option) => (
            <div key={option}>
              <Input
                type="checkbox"
                id={`${currentQuestionIndex}-${option}`}
                name={option}
                // Here we can manage checkbox states as needed
                onChange={() => { }}
              />
              <label htmlFor={`${currentQuestionIndex}-${option}`}>
                {`${option}: ${questionData[currentQuestionIndex][option]}`}
              </label>
            </div>
          ))}
        </div>
      )}
      {/* <Button
        type="button"
        title="Previous"
        className="my-button"
        text="Previous"
        onClick={handlePreviousClick}
        disabled={currentQuestionIndex === 0} // Disable if at the first question
      /> 
            <Button
        type="button"
        title="Previous"
        className="my-button"
        text="Previous"
        onClick={handleNextClick}
        disabled={currentQuestionIndex === 0} // Disable if at the first question
      />  */}
      <Footer
        onPrevious={handlePreviousClick}
        onNext={handleNextClick}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={questionData.length}
      />
    </div>
  );
}
