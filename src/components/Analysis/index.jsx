import React, { useState } from "react";
import "./analysis.css"; // Make sure to include the CSS file for styling
import { decryptPassword } from "../../config/commonFunctions/decryptPassword";
import parse from "html-react-parser";

const Analysis = ({
  isVisible,
  onClose,
  questionAnalysis,
  palletQuestionBoxData,
  questionPassageSts,
  questionText,
  questionsOptionsArr,
  quesRightAns,
  selectedAnswers,
  questionSolution
}) => {
  const currentQuestionCount = palletQuestionBoxData.questionNo; 
  let questionResult = 0; // unattempted
  let answerGiven = "";
  if (palletQuestionBoxData?.attemptsData?.length > 0) {
    questionResult = palletQuestionBoxData?.attemptsData[0].analysisData.result;
    answerGiven = palletQuestionBoxData?.attemptsData[0].analysisData.answerGiven;
  } else {
    questionAnalysis.testData[0]?.sectionsData.forEach((item) => {
      item.questions.forEach((question) => { 
        if(typeof question.answerGiven != "undefined"){
          answerGiven = atob(question.answerGiven); 
        }  
      });
    });
    
  } 

  console.log('questionAnalysis', questionAnalysis)
  const correctAnswer = palletQuestionBoxData?.correctAnswer;

  return (
    isVisible && (
      <div className="popup-main">
        <div className="popup">
          <div className="popup-header">
            <h3>Verbal Ability | Question: {currentQuestionCount}</h3>
            <span className="close-btn" onClick={onClose}>
              &times;
            </span>
          </div>
          <div className="popup-content">
            {questionPassageSts.qp_status && (
              <div className="popup-left">
                {questionPassageSts.questionPassage}
              </div>
            )}
            <div className="popup-right">
              <div className="question-header">
                <div className="ques-cnt">{currentQuestionCount}</div>
                <div className="abc-badging"></div>
              </div>
              <div className="single-question">
                <h3>{questionText}</h3>
              </div>
              <div className="options">
                {questionsOptionsArr.length > 0 &&
                  questionsOptionsArr.map((optionsArr, arrIndex) =>
                    optionsArr.map((option, index) => {
                      let clsName = "";
                      let imgIcon = ""; 

                      if(index + 1  == answerGiven){
                        clsName = "incorrect";
                        imgIcon = "cross.svg";
                      } 
                      
                      if (index + 1 == quesRightAns) {
                        clsName = "correct";
                        imgIcon = "checked.svg";
                      }

                      return (
                        <div
                          key={`${arrIndex}-${index}`}
                          className={`option ${clsName}`}
                        >
                          <p>{parse(decryptPassword(atob(option)))}</p>
                          {imgIcon && (
                            <img
                              src={`${process.env.PUBLIC_URL}/img/${imgIcon}`}
                              alt="Flag Icon"
                            />
                          )}
                        </div>
                      );
                    })
                  )}
              </div>
              <div className="explanation">
                <h4>Right Answer Explanation / Suggested Answer:</h4>
                <p>{questionSolution}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Analysis;
