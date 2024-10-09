import React, { useContext, useEffect, useRef, useState } from "react";
import { Footer } from "./Footer";
import { UserInfoAuthContext } from "../contexts/UserInfoContext";
import { Question_heading } from "./Question_heading";
import { QuestionDataContext } from "../contexts/QuestionDataContext";
import { decryptPassword } from "../commonFunctions/decryptPassword";
import CalcModal from "./modalComponent/CalcModal";
import Annotate from "./modalComponent/Annotate";
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

  const [selectedAnswers, setSelectedAnswers] = useState(""); // Store user Answer Selection
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loadQuestionSts, setLadQuestionSts] = useState(false);
  const [questionText, setQuestionText] = useState();
  const [currentQuesData, setCurrentQuesData] = useState();
  const [questionsOptionsArr, setquestionsOptionsArr] = useState([]);
  // State to manage visibility of SecondComponent
  const [isVisible, setIsVisible] = useState(false);
  const [isStrikeItems, setIsStrike] = useState({});
  const [currentQuestionId, setCurrentQuestionId] = useState(0);
  const [isOpenCalc, setIsOpenCalc] = useState(false);
  const [isOpenAnnotate, setIsOpenAnnotate] = useState(false);
  const [isTxtSelected, setIsTxtSelected] = useState(false);
  const annotateRef = useRef(null);
  const [selectedText, setSelectedText] = useState("");
  const [selectionNo, setSelectionNo] = useState(0);
  const [annotateData, setAnnotateData] = useState([]);
  const [textAreaValue, setTextAreaValue] = useState("");
  const [isNewAnnotate, setNewAnnotate] = useState(true);

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
  }, [questionsDataLoaded, annotateData]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  // Handle form input changes and update state
  const handleSubmit = (e) => {
    const { name, value } = e.target;
    setIsSubmitted(true);
    setFormData({
      ...formData,
      [name]: value, // Dynamically update the form field being changed
    });
    console.log(formData);
  };

  const handleCheckboxChange = (option) => {
    setSelectedAnswers(option);
  };

  const convertToLetter = (num) => {
    return String.fromCharCode(64 + num); // 'A' starts at 65 in ASCII
  };

  const [testTimeSpent, setTestTimeSpent] = useState(1);
  const intervalRef = useRef(null); // UseRef to store the interval ID

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
    intervalRef.current = setInterval(() => {
      setTestTimeSpent((prevTime) => prevTime + 1);
    }, 1000);
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

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds} ${
      minutes > 0 ? "min" : "sec"
    }`;
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

  const annotateFunc = (selectedText) => {
    setIsTxtSelected(false);
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
          console.log(contents);
          var newNode = document.createElement("mark");
          const spanNode = document.createElement("span");
          spanNode.classList.add("tooltip");
          newNode.classList.add("markPopup");
          newNode.classList.add("active");
          newNode.setAttribute("id", "mark_" + selectionNo);
          newNode.setAttribute("serialNo", selectionNo);
          // range.surroundContents(newNode);
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
  };

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

      // Append the tooltip to the document body
      document.body.appendChild(toolTip);

      // Get the dimensions of the tooltip and the target element
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
    console.log(annotateData[serialNo]);
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

  return (
    <>
      <form onSubmit={handleSubmit}>
        <SubHeader
          currentQuestionCount={currentQuestionNo + 1}
          testTimeStarts={formatTime(testTimeSpent)}
          showCalc={showCalc}
          annotateFunc={annotateFunc}
          selectedText={selectedText}
          isTxtSelected={isTxtSelected}
          annotateRef={annotateRef}
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
                  <h3 onMouseUp={SetSelectedTxt} className="makeselection">
                    {questionText}
                  </h3>
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
                            name={`${currentQuestionNo}`}
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
      </form>
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
    </>
  );
}
