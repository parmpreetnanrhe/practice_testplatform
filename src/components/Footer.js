import React from 'react';
import { Button } from './Button';

export const Footer = ({ onSubmit , onPrevious, onNext, currentQuestionIndex, totalQuestions }) => {
  return (
    <footer className="footer">
      <div>
        <Button
          type="button"
          title="Submit"
<<<<<<< HEAD
          className="commonBtn submitBtn"
          text="Submit"
          onClick={onSubmit}
        />
=======
          className="commonBtn submitBtn"
          onClick={() => console.log('Submit clicked!')}
        >
          Submit
        </Button>
>>>>>>> a13e4e0ea80791201c9a0cd963e21ccc03b0c278
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

