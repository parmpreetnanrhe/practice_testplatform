import React, { useContext, useEffect, useRef, useState } from "react";
import { Footer } from "./Footer";
import { UserInfoAuthContext } from "../contexts/UserInfoContext";
import { Question_heading } from "./Question_heading";
import { QuestionDataContext } from "../contexts/QuestionDataContext";
import { decryptPassword } from "../commonFunctions/decryptPassword";
import Input from "./Input";
import SubHeader from "./SubHeader";
import TestStartTimerProvider, {
  TestStartTimerContext,
} from "./TestStartTimer";

export default function QuestionArea({ questionAreaProps }) {
  const {
    questionsDataLoaded,
    currentQuestionNo,
    handleQuestionClick,
    palletQuestionBoxData,
    questionAreaVisible,
  } = questionAreaProps;

  const testTimerStarts = useContext(TestStartTimerContext);
  const currentQuestionIndex = useRef(); // useRef, it persists the value across renders without causing a re-render.it will not trigger a re-render when updated.

  currentQuestionIndex.current = currentQuestionNo;

  const [selectedAnswers, setSelectedAnswers] = useState(''); // Store user Answer Selection
  const [isSubmitted, setIsSubmitted] = useState(questionsDataLoaded);
  const [loadQuestionSts, setLadQuestionSts] = useState(false);
  const [questionText, setQuestionText] = useState();
  const [currentQuesData, setCurrentQuesData] = useState();
  const [questionsOptionsArr, setquestionsOptionsArr] = useState([]);
  // State to manage visibility of SecondComponent
  const [isVisible, setIsVisible] = useState(false);
  const [isStrikeItems, setIsStrike] = useState({});
  const [currentQuestionId, setCurrentQuestionId] = useState(0);

  // Toggle the visibility of SecondComponent
  const handleToggleVisibility = (d,f) => {
    setIsVisible(!isVisible);
    setIsStrike(Array());
  };

  const setStrike = (index) => {
    const newVisibleItems = [...isStrikeItems]; 
    const newSelectedAns = (selectedAnswers == index+1)?'':selectedAnswers; 
    newVisibleItems[index] = !newVisibleItems[index];
    setSelectedAnswers(newSelectedAns);
    setIsStrike(newVisibleItems);
  };

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
      setCurrentQuestionId(encodedString[0].questions[0].questionId);
      setQuestionText(decodedQuestionText);
      setquestionsOptionsArr(questionsOptionsArr);
      console.log(questionsOptionsArr);
    }
  }, [questionsDataLoaded]);

  const [formData, setFormData] = useState({
    answerGiven: "", 
  });



  const handleSubmit = (e) => {

    setIsSubmitted(prevOnj => {
      return {
        ...prevOnj, // Keep the previous state
        testData: {
          ...prevOnj.testData, // Keep other testData properties
          sectionsData: [
            ...prevOnj.testData.sectionsData, // Spread the existing questions 
          ].map(question => {
            console.log(question);
            return {
              ...question,
              testTimeSpentttttttttttttttttttttttttttttttttt: testTimeSpent
            };
          })
        }
      };
    });
     console.log(isSubmitted.testData.sectionsData);
    // console.log('Form Data Submitted:', selectedAnswers, testTimeSpent);
  };
  
  const handleCheckboxChange = (option) => {
    setSelectedAnswers(() => ({ 
      [currentQuestionNo]: option,
    }));
  };

  const convertToLetter = (num) => {
    return String.fromCharCode(64 + num); // 'A' starts at 65 in ASCII
  };

  const [testTimeSpent, setTestTimeSpent] = useState(1);
  const intervalRef = useRef(null); // UseRef to store the interval ID

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTestTimeSpent((prevTime) => prevTime + 1);
    }, 1000);

    // Clear the interval when the component is unmounted
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
    <> 
        <SubHeader
          currentQuestionCount={currentQuestionNo + 1}
          testTimeStarts={formatTime(testTimeSpent)}
        />
        <div className="question-main-container">
          {questionText && (
            <div
              className={`question-container ${
                !questionAreaVisible ? "loading" : ""
              } `}
            >
              <Question_heading
                onClick={handleToggleVisibility}
                currentQuestionCount={currentQuestionNo + 1}
              />
              {questionText && (
                <div className="single-question">
                  <h3>{questionText}</h3>
                  {questionsOptionsArr[0].map((option,index) => (
                    <div className='quesOptions'>
                      <label className={`quesOpt ${!questionAreaVisible ? 'loading' : ""}`} htmlFor={`${index+1}-${currentQuestionId}`} key={option}>
                        {isStrikeItems[index] && isVisible && (
                          <div className="optStrike"></div>
                        )}
                        <div className="perseusInteractive">
                          <Input
                            type="radio"
                            id={`${index + 1}-${currentQuestionId}`}
                            name={`${currentQuestionId}`}
                            // Here we can manage checkbox states as needed
                            value={index+1}
                            checked={selectedAnswers[currentQuestionNo] === index+1 && !isStrikeItems[index]}
                            onChange={() => handleCheckboxChange(index+1)}
                          />
                          <span className="iconWrapper">
                            {convertToLetter(index + 1)}
                          </span>
                        </div>
                        <span className="optionTxt">
                          {decryptPassword(atob(option))}
                        </span>
                      </label>
                      {isVisible && (
                        <div className='optDisabled' onClick={()=>setStrike(index)}>
                          <span className='iconWrapper'>{convertToLetter(index+1)}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div> 
      <div>
        <Footer
          onSubmit={handleSubmit}
          onPrevious={questionAreaVisible ? handlePreviousClick : null}
          onNext={questionAreaVisible ? () => handleNextClick() : null}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={palletQuestionBoxData.length}
          // totalQuestions={questionsDataLoaded.length}
        />
      </div>
    </>
  );
}
