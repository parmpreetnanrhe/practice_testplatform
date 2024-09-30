import React from 'react';
import { Button } from './Button';

export const Footer = ({ onPrevious, onNext, currentQuestionIndex, totalQuestions }) => {
  return (
    <footer className="footer">
      <div>
        <Button
          type="button"
          title="Submit"
          className="my-button"
          text="Submit"
          onClick={() => console.log('Submit clicked!')}
        />
      </div>
      <div>
        <Button
          type="button"
          title="Previous"
          className="my-button"
          text="Previous"
          onClick={onPrevious}
          disabled={currentQuestionIndex === 0} // Disable if at first question
        />
        <Button
          type="button"
          title="Next"
          className="my-button"
          text="Next"
          onClick={onNext}
          disabled={currentQuestionIndex === totalQuestions - 1} // Disable if at last question
        />
      </div>
    </footer>
  );
};

