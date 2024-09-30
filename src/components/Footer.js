import React from 'react';
import { Button } from './Button';

export const Footer = ({ onPrevious, onNext, currentQuestionIndex, totalQuestions }) => {
  return (
    <footer className="footer">
      <div>
        <Button
          type="button"
          title="Submit"
          className="commonBtn submitBtn"
          onClick={() => console.log('Submit clicked!')}
        >
          Submit
        </Button>
      </div>
      <div className="nxtPrevBtn">
        <Button
          type="button"
          title="Previous"
          className="commonBtn"
          onClick={onPrevious}
          disabled={currentQuestionIndex === 0} // Disable if at first question
        >
          <img src={`${process.env.PUBLIC_URL}/img/backIcon.svg`}/> Previous
        </Button>
        <Button
          type="button"
          title="Next"
          className="commonBtn"
          onClick={onNext}
          disabled={currentQuestionIndex === totalQuestions - 1} // Disable if at last question
        >
          Next <img src={`${process.env.PUBLIC_URL}/img/nextIcon.svg`}/>
        </Button>
      </div>
    </footer>
  );
};

