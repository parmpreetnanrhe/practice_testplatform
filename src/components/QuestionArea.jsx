import React, { useContext, useEffect, useRef, useState } from "react";
import { Footer } from "./Footer";
import { Question_heading } from "./Question_heading";
import { decryptPassword } from "../commonFunctions/decryptPassword";
import CalcModal from "./modalComponent/CalcModal";
import Input from "./Input";
import SubHeader from "./SubHeader";
import { SubmitApi } from "../apis/SubmitApi";
import AlertModal from "./modalComponent/AlertModal";
import FullScreenLoader from "./modalComponent/FullScreenLoader";
import parse from "html-react-parser";
import LeftQuestionArea from "./LeftQuestionArea";
export default function QuestionArea({ questionAreaProps }) {
  const {
    questionsDataLoaded,
    currentQuestionNo,
    handleQuestionClick,
    palletQuestionBoxData,
    questionAreaVisible,
  } = questionAreaProps;
  console.log('palletQuestionBoxData', palletQuestionBoxData)
  const currentQuestionIndex = useRef(); // useRef, it persists the value across renders without causing a re-render.it will not trigger a re-render when updated.
  currentQuestionIndex.current = currentQuestionNo;

  const [selectedAnswers, setSelectedAnswers] = useState(""); // Store user Answer Selection
  const [questionText, setQuestionText] = useState("");
  const [questionPassageSts, setQuestionPassageSts] = useState({
    questionPassage: "",
    qp_status: false,
  });
  const [questionsOptionsArr, setquestionsOptionsArr] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isStrikeItems, setIsStrike] = useState({});
  const [currentQuestionId, setCurrentQuestionId] = useState(0);
  const [isOpenCalc, setIsOpenCalc] = useState(false);
  const [isSubmit, setIsSubmit] = useState({
    continueBtnShow: false,
    continueBtnClicked: false,
    modalShowHideStatus: false,
    isSubmitQuestionLoader: false,
  });


  const testTimeSpentRef = useRef(0);
  const intervalRef = useRef(null); // UseRef to store the interval ID

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
    if (currentQuestionIndex.current < palletQuestionBoxData.questionsData.length - 1) {
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
    const dataLoaded = palletQuestionBoxData.questionsData[currentQuestionIndexVal];
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
      let base64EncodedQuestionPassage = quesArray.questionPassage;
      let questionsOptionsArr = quesArray.questionsOptions;
      let decodedQuestionText = decryptPassword(atob(base64EncodedText));
      setCurrentQuestionId(quesArray.questionId);
      setQuestionText(decodedQuestionText);
      if (base64EncodedQuestionPassage != "") {
        setQuestionPassageSts({
          questionPassage: decryptPassword(atob(base64EncodedQuestionPassage)),
          qp_status:true
        });
      }
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
          testTimeSpent: testTimeSpentRef.current,
        };
      });
    });
    console.log(questionsDataLoaded.testData.sectionsData[0]);
    handleQuestionSubmit(questionsDataLoaded);
  };

  useEffect(() => {
    if (isSubmit.continueBtnClicked) {
      setIsSubmit((prevState) => ({
        ...prevState,
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
      setIsSubmit((prevState) => ({
        ...prevState,
        isSubmitQuestionLoader: true,
        modalShowHideStatus: false,
      }));
      await SubmitApi(questionsDataLoaded)
        .then((data) => {
          if (data.success == 0) {
            setIsSubmit((prevState) => ({
              ...prevState,
              isSubmitQuestionLoader: false,
            }));
          } else if (data.success == 1) {
            setIsSubmit((prevState) => ({
              ...prevState,
              isSubmitQuestionLoader: false,
            }));
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
 

  // Test Start Timer
  useEffect(() => {
    // Start the timer
    intervalRef.current = setInterval(() => {
      testTimeSpentRef.current += 1; 
    }, 1000);

    // Clean up the interval on component unmount
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  // ---------- End --------

  const showCalc = () => {
    setIsOpenCalc(!isOpenCalc);
  };

  const handleAnalysisClick = () => {};

  return (
    <>
      <SubHeader
        testTimeStarts={parseInt(testTimeSpentRef.current)}
        currentQuestionCount={currentQuestionNo + 1}
        showCalc={showCalc}
      />
      <div className="question-main-container">
        {questionPassageSts.qp_status && <LeftQuestionArea passageContent={questionPassageSts.questionPassage}/>}
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
                <h3>{parse(questionText)}</h3>
                {questionsOptionsArr.length > 0 &&
                  questionsOptionsArr.map((optionsArr, arrIndex) =>
                    optionsArr.map((option, index) => (
                      <div
                        className={`quesOptions${
                          isStrikeItems[index] ? " strikeCls" : ""
                        }`}
                        key={`${option}-${arrIndex}-${index}`} // Unique key combining option and indices
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
                            {parse(decryptPassword(atob(optionsArr[index])))}
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
                    ))
                  )}
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
          onClickAnalysis={
            questionAreaVisible ? () => handleAnalysisClick() : null
          }
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={palletQuestionBoxData.questionsData.length}
          // totalQuestions={questionsDataLoaded.length}
        />
        {isSubmit.modalShowHideStatus && (
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
        {isSubmit.isSubmitQuestionLoader && (
          <FullScreenLoader
            loaderShowHide={true}
            text="Submitting yor question..."
          />
        )}
      </div>
      <CalcModal isOpen={isOpenCalc} showCalc={showCalc} />
    </>
  );
}
