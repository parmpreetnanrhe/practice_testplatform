import React from 'react';
import { Button } from './Button';

export const Footer = ({ onSubmit, onPrevious, onNext, onClickAnalysis, currentQuestionIndex, totalQuestions }) => {
  return (
    <footer className="footer">
      <div className="nxtPrevBtn">
        <Button
          type="button"
          title="Submit"
          className="commonBtn submitBtn"
          onClick={onSubmit}
        >
          Submit
        </Button>
        <Button
          type="button"
          title="Submit"
          className="commonBtn next-Btn"
          onClick={onClickAnalysis}
        >
          Analysis
        </Button>
      </div>
      <div className="nxtPrevBtn">
        {currentQuestionIndex.current > 0 && (
          <Button
            type="button"
            title="Previous Question"
            className="commonBtn prev-Btn"
            onClick={onPrevious}
          >
            <img src={`${process.env.PUBLIC_URL}/img/backIcon.svg`}
              style={{ height: "12px" }} /> Prev Ques.
          </Button>
        )}
        {currentQuestionIndex.current < totalQuestions - 1 && (
          <Button
            type="button"
            title="Next Question"
            className="commonBtn next-Btn"
            onClick={onNext}
            disabled={currentQuestionIndex.current === totalQuestions - 1} // Disable if at last question
          >
            Next Ques.<img src={`${process.env.PUBLIC_URL}/img/nextIcon.svg`}
              style={{ height: "12px", marginLeft: "5px" }} />
          </Button>
        )}
      </div>
    </footer>
  );
};

