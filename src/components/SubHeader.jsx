import React, { useContext } from 'react';
import { Button } from './Button';
import { Headings } from './Headings';
import { TestInfoContext } from '../contexts/TestInfoContext';

export default function SubHeader({ testTimeStarts, currentQuestionCount, showCalc, annotateFunc, selectedText, isTxtSelected, annotateRef }) {
const TestInfoData = useContext(TestInfoContext);  

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
          text={testTimeStarts}
        />
      </div>
      <div className="subHeaderIconBar" ref={annotateRef}>
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
          title="Annotate"
          className="commonBtn iconBtn"
          onClick={() => annotateFunc(selectedText)}
        >
          <img
            src={`${process.env.PUBLIC_URL}/img/annotateIcon.svg`}
            alt="Annotate Icon"
          />
          <span>Annotate</span>
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
