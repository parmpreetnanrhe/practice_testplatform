import React from 'react';
import { Button } from './Button';

export const Footer = ({ onSubmit, onPrevious, onNext, currentQuestionIndex, totalQuestions }) => {
  return (
    <footer className="footer">
      <div>
        <Button
          type="button"
          title="Submit"
          className="commonBtn submitBtn"
          onClick={onSubmit}
        >
          Submit
        </Button>
      </div>
      <div className="nxtPrevBtn">
        <Button
          type="button"
          title="Previous Question"
          className="commonBtn prev-Btn"
          onClick={onPrevious}
          disabled={currentQuestionIndex === 0} // Disable if at first question
        >
          <img src={`${process.env.PUBLIC_URL}/img/backIcon.svg`}
            style={{ height: "12px" }} /> Prev Ques.
        </Button>
        <Button
          type="button"
          title="Next Question"
          className="commonBtn next-Btn"
          onClick={onNext}
          disabled={currentQuestionIndex === totalQuestions - 1} // Disable if at last question
        >
          Next Ques.<img src={`${process.env.PUBLIC_URL}/img/nextIcon.svg`}
            style={{ height: "12px", marginLeft: "5px" }} />
        </Button>
      </div>
    </footer>
  );
};

