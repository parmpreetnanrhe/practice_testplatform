import React, { useContext, useEffect, useState } from "react";
import { Button } from "./Button";
import SelectComponent from "./SelectComponent";
import { PracticeQuesPallet } from "../contexts/PracticeQuesPalletContext";
import QuestionArea from "./QuestionArea";
import { FetchQuestionDataApi } from "../apis/FetchQuestionDataApi";
import FullScreenLoader from "./modalComponent/FullScreenLoader";

export default function Pallet() {
  console.log("pallet Component calling....")
  const [questionsDataLoaded, setQuestionsDataLoaded] = useState([]);
  const [currentQuestionNo, setCurrentQuestionNo] = useState(0);
  const [categoryNamesArray, setCategoryNamesArray] = useState([]);
  const [palletQuestionBoxData, setPalletQuestionBoxData] = useState([]);
  const [questionAreaVisible, setQuestionAreaVisible] = useState(false);
  const [showScreenLoader, setShowScreenLoader] = useState(true);
  const [isPalletOpen, setIsPalletOpen] = useState(true);
  const [disabled, setDisabled] = useState(false); 
  const [loaderText,setLoaderText] = useState("");
  // pallet data coming from context
  const palletData = useContext(PracticeQuesPallet);
  const pQuesData = palletData.palletQueData;
  const loading = palletData.loading;
  const handlePalletQuestionsLoad = palletData.handlePalletLoadApi;
  console.log(loading);

  const optionsArray = [
    "All",
    "Correct",
    "Incorrect",
    "Un-attempted",
    "Flagged",
  ];
  const options2 = optionsArray.map((option, index) => ({
    value: index,
    label: option,
  }));

  const togglePanel = () => {
    if (disabled) {
      setIsPalletOpen(!isPalletOpen);
    }
  };

  // Fetch question data when a question-box is clicked
  const handleQuestionClick = async (platformLink, questionNo) => {
    setIsPalletOpen(false);
    setQuestionAreaVisible(false);
    setShowScreenLoader(true);
    setLoaderText("Please wait while we are loading...");
    await FetchQuestionDataApi(platformLink, questionNo)
      .then((data) => {
        if(data.success == 0){
          alert("Something went wrong Pallet API!");
        }
        setQuestionsDataLoaded(data);
        setCurrentQuestionNo(questionNo);
        setQuestionAreaVisible(true);
        setDisabled(true);
        setShowScreenLoader(false);
      })
      .catch((error) => console.error("Error fetching question data:", error));
  };

  const [selectedCategory, setSelectedCategory] = useState(''); 
  const handlePalletDataLoad = (selectedValue) =>{
    setShowScreenLoader(true);
    palletData.setLoading(true);
    const payLoads = "Y2twbGZPaHpgcG56fDokIiUjOCEvZHRmcE52PD8kOCMkMD98em17ekl+bGFxOiU0ZGZtYX1uenxmRXdtYXpvR3s+an9rbWJna3Ane2p1YXt7dFxreWIoc2Zkd29qfWZ0MmVwY3ppe1p8Z2Q1ZGt5NHR5aWpbYmRncHRmPD8=";
    handlePalletQuestionsLoad(payLoads);
    setSelectedCategory(selectedValue);
    console.log("Selected value from dropdown: ", selectedValue); 
  }

  useEffect(() => {
    setPalletQuestionBoxData(pQuesData.questionsData);
    if (pQuesData && pQuesData.categoryNamesArray) {
      const categoriesWithSubCats = pQuesData.categoryNamesArray.filter(
        (category) => category.subCats && category.subCats.length > 0
      );
      const categories = categoriesWithSubCats.map((data) => ({
        value: data.cateId,
        label: data.name,
      }));
      setCategoryNamesArray(categories);
    }
  }, [pQuesData]);

  return (
    <>
      {questionAreaVisible && ( 
          <QuestionArea
            questionAreaProps={{
              questionsDataLoaded,
              currentQuestionNo,
              handleQuestionClick,
              palletQuestionBoxData,
              questionAreaVisible,
            }}
          /> 
      )}
      
      {showScreenLoader && (
        <FullScreenLoader
          text={loaderText}
        />
      )}

      <div
        className={`pallet-button ${isPalletOpen ? "pallet-button-move" : ""} ${
          showScreenLoader ? "disabledEvents" : ""
        }`}
      >
        <Button
          type="button"
          title="Expand"
          className="right-button"
          text="<"
          onClick={togglePanel}
        >
          <img
            src={`${process.env.PUBLIC_URL}/img/whitebackicon.svg`}
            style={isPalletOpen ? { transform: "rotate(539deg)" } : {}}
            alt="Arrow Icon"
          />
        </Button>
      </div>
      <div className={`side-panel ${isPalletOpen ? "open" : ""} `}>
        <div className={`select-pallet-tag `}>
          <SelectComponent
            options={categoryNamesArray}
            onSelectChange={handlePalletDataLoad}
            defaultText="Please select a value"
            className={`${loading ? "loading" : ""}`}
          />
          <SelectComponent
            options={options2}
            onSelectChange=""
            defaultText="Please select a value"
            className={`${loading ? "loading" : ""}`}
          />
        </div>
        <div className={`question-box-container`}>
          {palletQuestionBoxData && palletQuestionBoxData.length > 0
            ? palletQuestionBoxData.map((queData, index) => (
                <div
                  key={queData.questionId}
                  className={`ques-box ${
                    queData.questionNo - 1 === currentQuestionNo &&
                    questionAreaVisible
                      ? "disabledEvents"
                      : ""
                  }`}
                  onClick={() => {
                    if (
                      !questionAreaVisible ||
                      queData.questionNo - 1 !== currentQuestionNo
                    ) {
                      handleQuestionClick(
                        queData.platformLink,
                        queData.questionNo - 1
                      );
                    }
                  }}
                >
                  <span>{queData.questionNo}</span>
                </div>
              ))
            : Array(55)
                .fill()
                .map((_, i) => (
                  <div
                    key={i}
                    className="ques-box loading"
                  >
                    <span>{i + 1}</span> {/* Displaying 1 to 56 */}
                  </div>
                ))}
        </div>
      </div>
    </>
  );
}
