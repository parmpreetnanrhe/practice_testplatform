import React, { useCallback, useEffect,useRef,useState } from "react";
import Footer from "./Footer";
import { Question_heading } from "./Question_heading";
import { decryptPassword } from "../config/commonFunctions/decryptPassword";
import CalcModal from "./modalComponent/CalcModal";
import Annotate from "./modalComponent/Annotate";
import Input from "./Input";
import SubHeader from "./SubHeader";
import { SubmitApi } from "../api/SubmitApi";
import AlertModal from "./modalComponent/AlertModal";
import FullScreenLoader from "./modalComponent/FullScreenLoader";
import parse from "html-react-parser";
import LeftQuestionArea from "./LeftQuestionArea";
import { TCY_URL } from "../config/commonFunctions/Constants";
import { updateImageSrcInString } from "../config/commonFunctions/common-functions";
import Analysis from "./Analysis";

export default function QuestionArea({ questionAreaProps }) {
  const continueBtnMessage = parse(`Are you sure that you want to submit this question If you click{" "} <b>Continue,</b> you will not be able to return to this question later.`);
  const answerGivenMessage = "To submit your answer, please ensure you have selected an option.";
  const {
    questionsDataLoaded,
    currentQuestionNo,
    handleQuestionClick,
    palletQuestionBoxData,
    questionAreaVisible,
    showAnalysisOnly,
    setShowAnalysisOnly,
    setPalletQuestionCorrectIncorrect,
    itemsRef,
    sectionName,
    setFlagSts,
    getURLString,
    isPalletOpen
  } = questionAreaProps; 
  const [loaderText, setLoaderText] = useState({
    loaderShowHide: false,
    loaderText: "",
  });

  const currentQuestionIndex = useRef(); // useRef, it persists the value across renders without causing a re-render.it will not trigger a re-render when updated.
  currentQuestionIndex.current = currentQuestionNo;
  const [quesRightAns, setQuesRightAns] = useState("");
  const [selectedAnswers, setSelectedAnswers] = useState(""); // Store user Answer Selection
  const [questionPassageSts, setQuestionPassageSts] = useState({
    questionPassage: "",
    qp_status: false,
  });
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
    isSubmitQuestionLoader: false,
    message: continueBtnMessage,
  });

  const [submitNotAllowed, setSubmitNotAllowed] = useState(true);

  const [showScreenLoader, setShowScreenLoader] = useState(true);
  const testTimeSpentRef = useRef(0);
  const intervalRef = useRef(null); // UseRef to store the interval ID
  const [isOpenAnnotate, setIsOpenAnnotate] = useState(false);
  const [isTxtSelected, setIsTxtSelected] = useState(false);
  const annotateRef = useRef(null);
  const [selectedText, setSelectedText] = useState("");
  const [selectionNo, setSelectionNo] = useState(0);
  const [annotateData, setAnnotateData] = useState([]);
  const [textAreaValue, setTextAreaValue] = useState("");
  const [isNewAnnotate, setNewAnnotate] = useState(true); 
  const [questionAnalysis, setQuestionAnalysis] = useState([]);
  const [questionSolution,setQuestionSolution] = useState("");

  // Toggle the visibility of SecondComponent
  const handleToggleVisibility = () => {
    setIsVisible(!isVisible);
    setIsStrike(Array());
  };

  const setStrike = (index) => {
    const newVisibleItems = [...isStrikeItems];
    const newSelectedAns = selectedAnswers == index + 1 ? "" : selectedAnswers;
    // If the item is already visible, hide it. Otherwise, make it visible and keep other items visible.
    newVisibleItems[index] = !newVisibleItems[index];
    setSelectedAnswers(newSelectedAns);
    setIsStrike(newVisibleItems);
  };

  // handleNextClick handlePreviousClick
  const handleNextClick = useCallback(() => { 
    if (
      currentQuestionIndex.current <
      palletQuestionBoxData.questionsData.length - 1
    ) {
      currentQuestionIndex.current += 1;
      updateQuestionData(currentQuestionIndex.current);
    }
  }, [questionAreaVisible]);

  const handlePreviousClick = useCallback(() => {
    if (currentQuestionIndex.current > 0) {
      currentQuestionIndex.current -= 1;
      updateQuestionData(currentQuestionIndex.current);
    }
  }, [questionAreaVisible]);

  const updateQuestionData = (currentQuestionIndexVal) => {
    testTimeSpentRef.current = 0;
    const dataLoaded =
      palletQuestionBoxData?.questionsData[currentQuestionIndexVal];
    let questionResult = 0; // unattempted
    if (dataLoaded?.attemptsData?.length > 0) {
      questionResult = dataLoaded?.attemptsData[0].analysisData.result;
    }else if(itemsRef.current[currentQuestionIndexVal]){ 
      questionResult = itemsRef?.current[currentQuestionIndexVal]?.[0]?.questionResult; 
      setSelectedAnswers(itemsRef?.current[currentQuestionIndexVal]?.[0]?.answerGiven);
    }
   
    let quesPayloadLink = dataLoaded?.platformLink;
    if (questionResult > 0) {
      quesPayloadLink = dataLoaded?.analysisLink;
    }

    handleQuestionClick(
      quesPayloadLink,
      currentQuestionIndexVal,
      dataLoaded.questionId
    );
  };

  // -----------End ---------

  useEffect(() => {
    if (
      questionsDataLoaded &&
      questionsDataLoaded.testData[0] &&
      questionsDataLoaded.testData[0].sectionsData
    ) {
      let quesArray = {};
      let encodedString = questionsDataLoaded.testData[0]?.sectionsData;
      encodedString?.map((item) => {
        item.questionsData?.map((questions) => {
          quesArray = questions;
        });
      });

      let base64EncodedQuestionPassage = quesArray.questionPassage;
      if (base64EncodedQuestionPassage) {
        const questionPassage = 
          atob(base64EncodedQuestionPassage)
        ;
        setQuestionPassageSts({
          questionPassage: questionPassage,
          qp_status: true,
        });

      }

      setShowScreenLoader(false);
      let base64EncodedText = quesArray.questionText;
      let base64EncodedQuestionSolution= quesArray.solution;
      let questionsOptionsArr = quesArray.questionsOptions;
      let decodedQuestionText = base64EncodedText
        ? parse(atob(base64EncodedText))
        : ""; 

      setQuesRightAns(quesArray.rightAnswer);
      setQuestionSolution((base64EncodedQuestionSolution ? parse(atob(base64EncodedQuestionSolution)) : "")) 
      setCurrentQuestionId(quesArray.questionId);
      setquestionsOptionsArr(questionsOptionsArr); 
      setQuestionText(decodedQuestionText);
    }
  }, [questionsDataLoaded]);


  // handle Question Submit
  const handleSubmit = (e) => {
    if (selectedAnswers == "") {
      setIsSubmit((prevState) => ({
        ...prevState,
        modalShowHideStatus: true,
        continueBtnShow: false,
        continueBtnClicked: false,
        message: answerGivenMessage,
      }));
    } else {
      setIsSubmit((prevState) => ({
        ...prevState,
        modalShowHideStatus: true,
        continueBtnShow: true,
        message: continueBtnMessage,
      }));
    }
 
    questionsDataLoaded.api = "submitQues";

    questionsDataLoaded.testData[0]?.sectionsData.forEach((item) => {
      item.questionsData = item.questionsData.map((question) => {
        return {
          ...question,
          answerGiven: btoa(selectedAnswers),
          timeSpent: testTimeSpentRef.current,
        };
      });
    });
    console.log('questionsDataLoaded', questionsDataLoaded);
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
    if (isSubmit.continueBtnClicked) {
      setIsSubmit((prevState) => ({
        ...prevState,
        isSubmitQuestionLoader: true,
        modalShowHideStatus: false,
      }));
      await SubmitApi(questionsDataLoaded,getURLString)
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
            setSubmitNotAllowed(false); 
            handleAnalysisClick(); 

 
            setPalletQuestionCorrectIncorrect([{
              currentQuestionNo:currentQuestionNo,
              quesRightAns: atob(quesRightAns),
              selectedAnswers: selectedAnswers,
          }]);
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
  const saveAnnotate = () => {
    setIsOpenAnnotate(false);
    const mark = document.querySelector("mark.active");
    const serialNo = mark.getAttribute("serialNo");
    setAnnotateData((prev) => {
      // Create a new copy of the previous annotations
      const newAnnotate = [...prev];
      // Update the specific index with the new value
      newAnnotate[`${serialNo}`] = textAreaValue;
      // Return the new state
      return newAnnotate;
    });
    setTextAreaValue("");
    // mark.classList.remove('active');
  };

  useEffect(() => {
    const marks = document.querySelectorAll("mark");
    marks.forEach((mark) => {
      mark.classList.remove("active");
    });
  }, [annotateData]); // Dependency array, runs when dummyValue changes

  useEffect(() => { 
    if (!showAnalysisOnly) {
      // Start the timer
      intervalRef.current = setInterval(() => {
        testTimeSpentRef.current += 1;
      }, 1000);

      // Clean up the interval on component unmount
      return () => {
        clearInterval(intervalRef.current);
      };
    }
  }, [testTimeSpentRef.current]);

  useEffect(() => {
    setTimeout(() => {
      const marks = document.querySelectorAll("mark");
      marks.forEach((mark) => {
        mark.addEventListener("click", handleMarkClick);
        mark.addEventListener("mouseenter", showTooltip);
        mark.addEventListener("mouseleave", hideTooltip);
      });
    }, 0);
    document.addEventListener("mousedown", handleClickOutside);
    // Clear the interval when the component is unmounted
    return () => {
      clearInterval(intervalRef.current);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenAnnotate]);

  // ---------- End --------


  const handleFlag = () => {
    setFlagSts((prevFlagSts) => {
      // Check if the current question number is already in the list
      const existingFlag = prevFlagSts.find(item => item.currentQuestionNo === currentQuestionNo); 
      if (existingFlag) {
        // Toggle flag if the question number exists
        return prevFlagSts.map(item =>
          item.currentQuestionNo === currentQuestionNo
            ? { ...item, flagStatus: !item.flagStatus }
            : item
        );
      } else {
        // If the question number does not exist, add a new entry with flagSts true
        return [...prevFlagSts, { currentQuestionNo, flagStatus: true }];
      }
    });
  };

  const showCalc = () => {
    setIsOpenCalc(!isOpenCalc);
  };

  const SetSelectedTxt = () => {
    if (!isOpenAnnotate) {
      const selection = window.getSelection();
      const selectedText = selection.toString();

      if (selectedText) {
        const range = selection.getRangeAt(0);
        let selectedNode = range.commonAncestorContainer;

        // Walk up the DOM tree until we find an element with class 'makeselection'
        let parentDiv =
          selectedNode.nodeType === 3
            ? selectedNode.parentElement
            : selectedNode;

        while (parentDiv && !parentDiv.classList.contains("makeselection")) {
          parentDiv = parentDiv.parentElement;
        }
        // If we found the div with 'makeselection' class, set the selected text
        if (parentDiv) {
          setSelectedText(selectedText);
        }
      } else {
        setSelectedText("");
      }
    }
  };

  const annotateFunc = useCallback(
    (selectedText) => {
      if (selectedText && !isOpenAnnotate) {
        setSelectionNo(selectionNo + 1);
        const selection = window.getSelection();
        var range = selection.getRangeAt(0);
        let startNode = range.startContainer;
        let endNode = range.endContainer;
        if (
          range.startContainer.nodeType === Node.TEXT_NODE &&
          range.endContainer.nodeType === Node.TEXT_NODE
        ) {
          try {
            let contents = range.extractContents();
            var newNode = document.createElement("mark");
            const spanNode = document.createElement("span");
            spanNode.classList.add("tooltip");
            newNode.classList.add("markPopup");
            newNode.classList.add("active");
            newNode.setAttribute("id", "mark_" + selectionNo);
            newNode.setAttribute("serialNo", selectionNo);
            newNode.appendChild(contents);
            newNode.appendChild(spanNode);
            range.insertNode(newNode);
            selection.removeAllRanges();
            setIsOpenAnnotate(!isOpenAnnotate);
          } catch (e) {
            console.error("Error wrapping contents:", e);
          }
        }
      } else {
        setIsTxtSelected(true);
      }
    },
    [setSelectionNo, setIsOpenAnnotate]
  );

  const handleClickOutside = (event) => {
    if (!isOpenAnnotate) {
      SetSelectedTxt();
    }
    if (annotateRef.current && !annotateRef.current.contains(event.target)) {
      setIsTxtSelected(false);
    }
  };

  const showTooltip = (e) => {
    const markElement = e.target;
    const serialNo = markElement.getAttribute("serialNo");
    if (annotateData[serialNo]) {
      const toolTip = document.createElement("div");
      toolTip.className = "toolTip";
      toolTip.textContent = annotateData[serialNo];
      document.body.appendChild(toolTip);
      const tooltipRect = toolTip.getBoundingClientRect();
      const markElementRect = markElement.getBoundingClientRect();
      // Calculate the position to center the tooltip above the target element
      let left =
        markElementRect.left +
        markElementRect.width / 2 -
        tooltipRect.width / 2;
      let top = markElementRect.top - tooltipRect.height - 5; // 5px above the element
      // Adjust position if tooltip goes off the left side of the window
      if (left < 0) {
        left = 5; // 5px from the left
      }
      // Adjust position if tooltip goes off the right side of the window
      if (left + tooltipRect.width > window.innerWidth) {
        left = window.innerWidth - tooltipRect.width - 5; // 5px from the right
      }
      // Adjust position if tooltip goes off the top of the window
      if (top < 0) {
        top = markElementRect.bottom + 5; // Place tooltip below the element
      }
      // Set the position of the tooltip
      toolTip.style.left = `${left}px`;
      toolTip.style.top = `${top}px`;
      // Show the tooltip
      toolTip.style.display = "block";
    }
  };

  const hideTooltip = (e) => {
    const toolTip = document.querySelector(".toolTip");
    if (toolTip) {
      // Remove the tooltip element
      toolTip.remove();
    }
  };

  const handleMarkClick = (e) => {
    setNewAnnotate(false);
    setIsOpenAnnotate(true);
    const markElement = e.target;
    const serialNo = markElement.getAttribute("serialNo");
    markElement.classList.add("active");
    if (annotateData[serialNo]) {
      setTextAreaValue(annotateData[serialNo]);
    } else {
      setTextAreaValue(""); // Optionally clear or set to default value
    }
    setSelectedText(markElement.textContent);
  };

  const deleteAnnotate = () => {
    setNewAnnotate(true);
    setIsOpenAnnotate(false);
    const mark = document.querySelector("mark.active");
    if (mark) {
      // Get the parent element of the mark element
      const parent = mark.parentNode;
      // Move all children of the mark element to the parent
      while (mark.firstChild) {
        parent.insertBefore(mark.firstChild, mark);
      }
      // Remove the mark element itself
      parent.removeChild(mark);
    }
    setTextAreaValue("");
  };

  const handleAnalysisClick = () => {  
    if (!showAnalysisOnly) {
      setShowAnalysisOnly(true);
    }
  };
  useEffect(() => { 
    if (showAnalysisOnly) {
      handleAnalysisClick();
      setSubmitNotAllowed(false);
    } 
  }, []); 
  return (
    <>
      {showScreenLoader && (
        <FullScreenLoader
          loaderShowHide={loaderText.loaderShowHide}
          text={loaderText.loaderText}
        />
      )}
      <main className={`mainContainer ${isPalletOpen ? "shrinked" : ""}`}>

      {!showAnalysisOnly && (
        <>
          <SubHeader
            testTimeStarts={parseInt(testTimeSpentRef.current)}
            currentQuestionCount={palletQuestionBoxData?.questionsData[currentQuestionNo].questionNo}
            handleFlag = {handleFlag}
            showCalc={showCalc}
            annotateFunc={annotateFunc}
            selectedText={selectedText}
            isTxtSelected={isTxtSelected}
            annotateRef={annotateRef}
            sectionName={sectionName}
          />
          <div className="question-main-container"> 
              <LeftQuestionArea
                questionPassageSts = {questionPassageSts.qp_status}
                passageContent={questionPassageSts.questionPassage}
              /> 
            
            {questionText && (
              <div
                className={`question-container right-question-area ${
                  !questionAreaVisible ? "loading" : ""
                } `}
              >
                <Question_heading
                  onClick={handleToggleVisibility}
                  currentQuestionCount={palletQuestionBoxData?.questionsData[currentQuestionNo].questionNo}
                />
                {questionText && (
                  <div className="single-question">
                    <h3 onMouseUp={SetSelectedTxt} className="makeselection">
                      {questionText}
                    </h3>
                    {questionsOptionsArr.length > 0 &&
                      questionsOptionsArr?.map((optionsArr, arrIndex) =>
                        optionsArr?.map((option, index) => (
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
                                  onChange={() =>
                                    handleCheckboxChange(index + 1)
                                  }
                                />
                                <span className="iconWrapper">
                                  {convertToLetter(index + 1)}
                                </span>
                              </div>
                              <span className="optionTxt">
                                {parse(
                                  atob(optionsArr[index])
                                )}
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
        </>
      )}
        <Footer
          onSubmit={handleSubmit}
          onPrevious={handlePreviousClick}
          onNext={handleNextClick}
          onClickAnalysis={handleAnalysisClick}
          currentQuestionIndex={currentQuestionIndex.current}
          totalQuestions={palletQuestionBoxData.questionsData.length}
          submitNotAllowed={submitNotAllowed}
          isPalletOpen={isPalletOpen}
        />
        {isSubmit.modalShowHideStatus && (
          <AlertModal
            isSubmitTest={{ isSubmit, setIsSubmit }}
            message={isSubmit.message}
            isPalletOpen={isPalletOpen}
          />
        )}
        {isSubmit.isSubmitQuestionLoader && (
          <FullScreenLoader
            loaderShowHide={true}
            text="Submitting yor question..."
          />
        )}
      <CalcModal isOpen={isOpenCalc} showCalc={showCalc} />
      <Annotate
        isOpenAnnotate={isOpenAnnotate}
        selectedText={selectedText}
        setIsOpenAnnotate={setIsOpenAnnotate}
        textAreaValue={textAreaValue}
        setTextAreaValue={setTextAreaValue}
        saveAnnotate={saveAnnotate}
        isNewAnnotate={isNewAnnotate}
        deleteAnnotate={deleteAnnotate}
      />
      {
        <Analysis
          isVisible={showAnalysisOnly}
          onClose={handleAnalysisClick}
          questionAnalysis={questionsDataLoaded}
          palletQuestionBoxData={palletQuestionBoxData?.questionsData[currentQuestionNo]} 
          questionPassageSts={questionPassageSts}
          questionText={questionText}
          questionsOptionsArr={questionsOptionsArr}
          quesRightAns={atob(quesRightAns)}
          selectedAnswers={itemsRef?.current[currentQuestionNo]?.[0]?.answerGiven}
          questionSolution={questionSolution}
          sectionName={sectionName}
          isPalletOpen={isPalletOpen}
        />
      }
      </main>

      {/* <div> */}
      {/* </div> */}
    </>
  );
}
