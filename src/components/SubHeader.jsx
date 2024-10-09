import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button } from './Button';
import { Headings } from './Headings';
import { TestInfoContext } from '../contexts/TestInfoContext';

export default function SubHeader({ testTimeStarts ,currentQuestionCount,showCalc }) {
const TestInfoData = useContext(TestInfoContext);  


const [testTimeSpent, setTestTimeSpent] = useState(testTimeStarts); 
 
const intervalRef = useRef(null); // UseRef to store the interval ID

// Test Start Timer 
useEffect(() => {
  intervalRef.current = setInterval(() => {
    setTestTimeSpent((prevTime) => prevTime + 1);
  }, 1000);
  return () => clearInterval(intervalRef.current);
}, []);


const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds} ${
    minutes > 0 ? "min" : "sec"
  }`;
};

  return (
    <header className="sub-header">
      <div>
        <Headings
          type={1}
          title="Main Title"
          className="main-title"
          text={`Verbal Ability | Question: ${currentQuestionCount }`}
        />
      </div>
      <div>
        <Headings
          type={2}
          title="Timer"
          className="timerTitle"
          text={formatTime(testTimeSpent)}
        />
      </div>
      <div className="subHeaderIconBar">
        <Button
          type="button"
          title="Flag"
          className="commonBtn iconBtn"
          onClick={() => console.log("Submit clicked!")}
        >
          <img
            src={`${process.env.PUBLIC_URL}/img/flagIcon.svg`}
            alt="Flag Icon"
          />
          <span>Flag</span>
        </Button>
        <Button
          type="button"
          title="Calculator"
          className="commonBtn iconBtn"
          onClick={() => showCalc()}
        >
          <img
            src={`${process.env.PUBLIC_URL}/img/calcIcon.svg`}
            alt="Calculator Icon"
          />
          <span>Calculator</span>
        </Button>

        <Button
          type="button"
          title="References"
          className="commonBtn iconBtn"
          onClick={() => console.log("Submit clicked!")}
        >
          <img
            src={`${process.env.PUBLIC_URL}/img/referIcon.svg`}
            alt="References Icon"
          />
          <span>References</span>
        </Button>
      </div>
    </header>
  );
}
