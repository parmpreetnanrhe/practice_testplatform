import React from 'react';
import { Button } from './Button';

function Footer ({ onSubmit, onPrevious, onNext, onClickAnalysis, currentQuestionIndex, totalQuestions ,submitNotAllowed,isPalletOpen}){ 
  return (
    <footer className={`footer  ${isPalletOpen ? "shrinked" : ""}`}>
      <div className="nxtPrevBtn">
        {submitNotAllowed &&
          <Button
            type="button"
            title="Submit"
            className="commonBtn submitBtn"
            onClick={onSubmit}
          >
            Submit
          </Button>
        }
      {!submitNotAllowed &&
        <Button
          type="button"
          title="Analysis"
          className="commonBtn next-Btn"
          onClick={onClickAnalysis}
        >
          Analysis
        </Button>
      }
      </div>
      <div className="nxtPrevBtn">
        {currentQuestionIndex > 0 && (
          <Button
            type="button"
            title="Previous Question"
            className="commonBtn prev-Btn"
            onClick={onPrevious}
          >
            <img 
              src={`${process.env.PUBLIC_URL}/img/backIcon.svg`} 
              style={{ height: "12px" }} 
              alt="Back Icon"
            /> Prev Ques.
          </Button>
        )}
        {currentQuestionIndex < totalQuestions - 1 && (
          <Button
            type="button"
            title="Next Question"
            className="commonBtn next-Btn"
            onClick={onNext}
            disabled={currentQuestionIndex === totalQuestions - 1} // Disable if at last question
          >
            Next Ques.
            <img 
              src={`${process.env.PUBLIC_URL}/img/nextIcon.svg`} 
              style={{ height: "12px", marginLeft: "5px" }} 
              alt="Next Icon"
            />
          </Button>
        )}
      </div>
    </footer>
  );
};
 
export default React.memo(Footer);

