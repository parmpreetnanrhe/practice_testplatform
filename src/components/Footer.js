import React from 'react';
import { Button } from './Button';

export const Footer = ({ onPrevious, onNext, currentQuestionIndex, totalQuestions }) => {
  return (
    <footer className="footer">
      <div>
        <Button
          type="button"
          title="Submit"
          className="commonBtn"
          onClick={() => console.log('Submit clicked!')}
        >
          Submit
        </Button>
      </div>
      <div>
        <Button
          type="button"
          title="Previous"
          className="commonBtn"
          onClick={onPrevious}
          disabled={currentQuestionIndex === 0} // Disable if at first question
        >
          Previous
        </Button>
        <Button
          type="button"
          title="Next"
          className="commonBtn"
          onClick={onNext}
          disabled={currentQuestionIndex === totalQuestions - 1} // Disable if at last question
        >
          Next
        </Button>
      </div>
    </footer>
  );
};

