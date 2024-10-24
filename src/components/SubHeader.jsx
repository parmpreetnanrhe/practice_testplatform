import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button } from './Button';
import { Headings } from './Headings';
import { TestInfoContext } from '../contexts/TestInfoContext';

export default function SubHeader({ testTimeStarts, currentQuestionCount, handleFlag ,showCalc, annotateFunc, selectedText, isTxtSelected, annotateRef ,sectionName }) {
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

const [boldStates, setBoldStates] = useState({
    flag: false,
    calculator: false,
    annotate: false,
    references: false,
  });

  const toggleBold = (buttonType) => {
    setBoldStates((prevState) => ({
      ...prevState,
      [buttonType]: !prevState[buttonType],
    }));
  };

  const handleButtonClick = (buttonType) => {
    setBoldStates((prevState) => ({
      ...prevState,
      [buttonType]: !prevState[buttonType],
    }));
       toggleBold();
    // Handle additional actions based on button type
    switch (buttonType) {
      case "flag":
        handleFlag();
        break;
      case "calculator":
        showCalc();
        break;
      case "annotate":
        annotateFunc(selectedText)
        // Assuming you have logic for annotating selected text
        break;
      case "references":
        console.log("References button clicked!");
        break;
      default:
        break;
    }
  };

  return (
    <header className="sub-header">
      <div>
        <Headings
          type={1}
          title="Main Title"
          className="main-title"
          text={`${sectionName} | Question: ${currentQuestionCount }`}
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
      <div className="subHeaderIconBar" ref={annotateRef}>
        <Button
          type="button"
          title="Flag"
          className={`commonBtn iconBtn ${boldStates.flag ? "boldText" : ""}`}
          onClick={()=>handleButtonClick("flag")} 
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
          className={`commonBtn iconBtn ${boldStates.calculator ? "boldText" : ""}`}
          onClick={()=>handleButtonClick("calculator")} 
        >
          <img
            src={`${process.env.PUBLIC_URL}/img/calcIcon.svg`}
            alt="Calculator Icon"
          />
          <span>Calculator</span>
        </Button>

        <Button
          type="button"
          title="Annotate"
          className={`commonBtn iconBtn ${boldStates.annotate ? "boldText" : ""}`}
          onClick={()=>handleButtonClick("annotate")} 
        >
          <img
            src={`${process.env.PUBLIC_URL}/img/annotateIcon.svg`}
            alt="Annotate Icon"
          />
          <span>Annotate</span>
        </Button>

        {/* <Button
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
        </Button> */}

        {isTxtSelected && (
          <div className='validateAnnotate'>
            <b>Make a Selection First</b>
            <p>Select some text, then press annotate.</p>
          </div>
        )}

      </div>
    </header>
  );
}
