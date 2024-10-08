import React, { useContext, useEffect, useRef, useState } from "react";
import { Footer } from "./Footer";
import { UserInfoAuthContext } from "../contexts/UserInfoContext";
import { Question_heading } from "./Question_heading";
import { QuestionDataContext } from "../contexts/QuestionDataContext";
import { decryptPassword } from "../commonFunctions/decryptPassword";
import CalcModal from "./modalComponent/CalcModal";
import Input from "./Input";
import SubHeader from "./SubHeader";
import { SubmitApi } from "../apis/SubmitApi";
import AlertModal from "./modalComponent/AlertModal";
export default function QuestionArea({ questionAreaProps }) {
  const {
    questionsDataLoaded,
    currentQuestionNo,
    handleQuestionClick,
    palletQuestionBoxData,
    questionAreaVisible,
  } = questionAreaProps;

  const currentQuestionIndex = useRef(); // useRef, it persists the value across renders without causing a re-render.it will not trigger a re-render when updated.
  currentQuestionIndex.current = currentQuestionNo;

  const [selectedAnswers, setSelectedAnswers] = useState(""); // Store user Answer Selection
  const [questionText, setQuestionText] = useState();
  const [questionsOptionsArr, setquestionsOptionsArr] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isStrikeItems, setIsStrike] = useState({});
  const [currentQuestionId, setCurrentQuestionId] = useState(0);
  const [isOpenCalc, setIsOpenCalc] = useState(false);
  const [isSubmit, setIsSubmit] = useState({
    continueBtnShow: false,
    continueBtnClicked: false,
    modalShowHideStatus: false,
  });

  // Toggle the visibility of SecondComponent
  const handleToggleVisibility = () => {
    setIsVisible(!isVisible);
    setIsStrike(Array());
  };

  const setStrike = (index) => {
    const newVisibleItems = [...isStrikeItems];
    const newSelectedAns = selectedAnswers == index + 1 ? "" : selectedAnswers;
    newVisibleItems[index] = !newVisibleItems[index];
    setSelectedAnswers(newSelectedAns);
    setIsStrike(newVisibleItems);
  };

  // handleNextClick handlePreviousClick
  const handleNextClick = () => {
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
    handleQuestionClick(dataLoaded.platformLink, currentQuestionIndexVal);
  };

  // -----------End ---------

  useEffect(() => {
    if (
      questionsDataLoaded &&
      questionsDataLoaded.testData &&
      questionsDataLoaded.testData.sectionsData
    ) {
      let quesArray;
      let encodedString = questionsDataLoaded.testData.sectionsData;
      encodedString.map((item) => {
        item.questions.map((questions) => {
          quesArray = questions;
        });
      });
      let base64EncodedText = quesArray.questionText;
      let questionsOptionsArr = quesArray.questionsOptions;
      let decodedQuestionText = decryptPassword(atob(base64EncodedText));
      setCurrentQuestionId(encodedString[0].questions[0].questionId);
      setQuestionText(decodedQuestionText);
      setquestionsOptionsArr(questionsOptionsArr);
      console.log(questionsOptionsArr);
    }
  }, [questionsDataLoaded]);

  // handle Question Submit
  const handleSubmit = (e) => {
    questionsDataLoaded.testData.sectionsData.forEach((item) => {
      item.questions = item.questions.map((question) => {
        return {
          ...question,
          answerGiven: selectedAnswers,
          testTimeSpent: testTimeSpent,
        };
      });
    });
    console.log(questionsDataLoaded.testData.sectionsData[0].questions[0]);

    handleQuestionSubmit(questionsDataLoaded);
  };

  useEffect(() => {
    if (isSubmit.continueBtnClicked) {
      setIsSubmit((prevState) => ({
        continueBtnShow: false,
        continueBtnClicked: false,
        modalShowHideStatus: false,
      }));
      handleQuestionSubmit(questionsDataLoaded);
    }
  }, [isSubmit.continueBtnClicked]);

  // ------------ End ---------
  // Fetch question data when a question-box is clicked
  const handleQuestionSubmit = async (questionsDataLoaded) => {
    setIsSubmit((prevState) => ({
      ...prevState,
      modalShowHideStatus: true,
      continueBtnShow: true,
    }));
    console.log(isSubmit.continueBtnClicked);
    if (isSubmit.continueBtnClicked) {
      await SubmitApi(questionsDataLoaded)
        .then((data) => {
          if (data.success == 0) {
            setIsSubmit((prevState) => ({
              ...prevState,
              modalShowHideStatus: false,
            }));
          } else if (data.success == 1) {
            alert("Test Submitted Successfully");
          } else {
            console.log("Something went wrong!");
          }
        })
        .catch((error) =>
          console.error("Error fetching question data:", error)
        );
    }
  };

  const handleCheckboxChange = (option) => {
    setSelectedAnswers(option);
  };

  const convertToLetter = (num) => {
    return String.fromCharCode(64 + num); // 'A' starts at 65 in ASCII
  };

  const [testTimeSpent, setTestTimeSpent] = useState(1);
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
  // ---------- End --------

  const showCalc = () => {
    setIsOpenCalc(!isOpenCalc);
  };

  return (
    <>
      <SubHeader
        currentQuestionCount={currentQuestionNo + 1}
        testTimeStarts={formatTime(testTimeSpent)}
        showCalc={showCalc}
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
                {questionsOptionsArr[0].map((option, index) => (
                  <div
                    className={`quesOptions${
                      isStrikeItems[index] ? " strikeCls" : ""
                    }`}
                    key={option}
                  >
                    <label
                      className={`quesOpt ${
                        !questionAreaVisible ? "loading" : ""
                      }`}
                      htmlFor={`${index + 1}-${currentQuestionNo}`}
                    >
                      {isStrikeItems[index] && isVisible && (
                        <div className="optStrike"></div>
                      )}
                      <div className="perseusInteractive">
                        <Input
                          type="radio"
                          id={`${index + 1}-${currentQuestionNo}`}
                          name={`${currentQuestionId}`}
                          // Here we can manage checkbox states as needed
                          value={index + 1}
                          disabled={isStrikeItems[index]}
                          checked={
                            selectedAnswers === index + 1 &&
                            !isStrikeItems[index]
                          }
                          onChange={() => handleCheckboxChange(index + 1)}
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
                      <div
                        className="optDisabled"
                        onClick={() => setStrike(index)}
                      >
                        {isStrikeItems[index] ? (
                          <span className="undoCls">Undo</span>
                        ) : (
                          <span className="iconWrapper strikeIcon">
                            {convertToLetter(index + 1)}
                          </span>
                        )}
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
        {isSubmit && (
          <AlertModal
            isSubmitTest={{ isSubmit, setIsSubmit }}
            message={
              <>
                Are you sure that you want to submit this question If you click{" "}
                <b>Continue,</b> you will not be able to return to this question
                later.
              </>
            }
          />
        )}
      </div>
      <CalcModal isOpen={isOpenCalc} showCalc={showCalc} />
    </>
  );
}
