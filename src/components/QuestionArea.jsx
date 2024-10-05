import React, { useContext, useEffect, useRef, useState } from "react";
import { Footer } from "./Footer";
import { UserInfoAuthContext } from "../contexts/UserInfoContext";
import { Question_heading } from "./Question_heading";
import { QuestionDataContext } from "../contexts/QuestionDataContext";
import { decryptPassword } from "../commonFunctions/decryptPassword";
import Input from "./Input";
import SubHeader from "./SubHeader"; 
import TestStartTimerProvider, { TestStartTimerContext } from "./TestStartTimer";
 

export default function QuestionArea({ questionAreaProps }) {
  const {
    questionsDataLoaded,
    currentQuestionNo,
    handleQuestionClick,
    palletQuestionBoxData,
    questionAreaVisible,
  } = questionAreaProps;

  const testTimerStarts = useContext(TestStartTimerContext);
  console.log("tt"+testTimerStarts);
  const currentQuestionIndex = useRef(); // useRef, it persists the value across renders without causing a re-render.it will not trigger a re-render when updated.

  currentQuestionIndex.current = currentQuestionNo;

  const [selectedAnswers, setSelectedAnswers] = useState({}); // Store user Answer Selection
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loadQuestionSts, setLadQuestionSts] = useState(false);
  const [questionText, setQuestionText] = useState();
  const [currentQuesData, setCurrentQuesData] = useState();
  const [questionsOptionsArr, setquestionsOptionsArr] = useState([]);


  const handleNextClick = () => {
    console.log(currentQuestionIndex.current)
    if (currentQuestionIndex.current < palletQuestionBoxData.length - 1) {
      currentQuestionIndex.current += 1;
      updateQuestionData(currentQuestionIndex.current);
    }
  };

  const handlePreviousClick = () => {
    if (currentQuestionIndex.current > 0) {
      currentQuestionIndex.current -= 1;
      updateQuestionData(currentQuestionIndex.current);
    }
  };

  const updateQuestionData = (currentQuestionIndexVal) => {
    const dataLoaded = palletQuestionBoxData[currentQuestionIndexVal];
    setCurrentQuesData(dataLoaded);
    console.log(questionsDataLoaded);
    console.log(currentQuestionIndex.current);
    console.log(dataLoaded.questionId);
    handleQuestionClick(dataLoaded.platformLink, currentQuestionIndexVal);
  };

  useEffect(() => {
    if (
      questionsDataLoaded &&
      questionsDataLoaded.testData &&
      questionsDataLoaded.testData.sectionsData
    ) {
      let encodedString = questionsDataLoaded.testData.sectionsData;
      let quesArray = encodedString[0].questions[0];
      let base64EncodedText = quesArray.questionText;
      let questionsOptionsArr = quesArray.questionsOptions;
      let decodedQuestionText = decryptPassword(atob(base64EncodedText));
      console.log(encodedString[0].questions[0].questionId);
      setQuestionText(decodedQuestionText);
      setquestionsOptionsArr(questionsOptionsArr);
      console.log(questionsOptionsArr);
    }
  }, [questionsDataLoaded]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh
    setIsSubmitted(true);
    console.log("Selected Answers: ", selectedAnswers);
    alert("Test Submitted!");
  };

  const handleCheckboxChange = (option) => {
    setSelectedAnswers((prevState) => ({
      ...prevState,
      [currentQuestionNo]: option,
    }));
  };

  const convertToLetter = (num) => {
    return String.fromCharCode(64 + num); // 'A' starts at 65 in ASCII
  };

  return (
    <> 
      <SubHeader currentQuestionCount={currentQuestionNo + 1} testTimeStarts={testTimerStarts} />
      <div className="question-main-container">
        {questionText && (
          <div className={`question-container ${!questionAreaVisible ? 'loading' : ""} `}>
            <Question_heading currentQuestionCount={currentQuestionNo + 1} />
            <form onSubmit={handleSubmit}>
              {questionText && (
                <div className="single-question">
                  <h3>{questionText}</h3>
                  {questionsOptionsArr[0].map((option,index) => (
                    <label className={`quesOpt ${!questionAreaVisible ? 'loading' : ""}`} htmlFor={`${index+1}-${currentQuestionNo}`} key={option}>
                      <div className='perseusInteractive'>
                        <Input
                          type="radio"
                          id={`${index+1}-${currentQuestionNo}`}
                          name={`${currentQuestionNo}`}
                          // Here we can manage checkbox states as needed
                          value={index+1}
                          checked={selectedAnswers[currentQuestionNo] === index+1}
                          onChange={() => handleCheckboxChange(index+1)}
                        />
                        <span className='iconWrapper'>{convertToLetter(index+1)}</span>
                      </div>
                      <span className='optionTxt'>
                        {decryptPassword(atob(option))}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </form>
          </div>
        )}
      </div>
      <div>
        <Footer
          onPrevious={(questionAreaVisible ? handlePreviousClick : null)}
          onNext={(questionAreaVisible ? () => handleNextClick() : null)}
          currentQuestionIndex={currentQuestionIndex}
          // totalQuestions={questionData.length}
          // totalQuestions={questionsDataLoaded.length}
        />
      </div> 
    </>
  );
}
