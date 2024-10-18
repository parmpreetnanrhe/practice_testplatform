import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Button } from "./Button";
import SelectComponent from "./SelectComponent";
import QuestionArea from "./QuestionArea";
import { FetchQuestionDataApi } from "../apis/FetchQuestionDataApi";
import FullScreenLoader from "./modalComponent/FullScreenLoader";
import { PracticeQuePalletApi } from "../apis/PracticeQuePalletApi";

export default function Pallet() {
  const itemsRef = useRef([]);
 
  const updateItem = (index, ...newValue) => {  
    itemsRef.current[index] = newValue; 
  };
  const [questionsDataLoaded, setQuestionsDataLoaded] = useState([]);
  const [currentQuestionNo, setCurrentQuestionNo] = useState(0);
  const [sectionName,setSectionName] = useState("");
  const [categoryNamesArray, setCategoryNamesArray] = useState([]);
  const [questionAreaVisible, setQuestionAreaVisible] = useState(false);
  const [isPalletOpen, setIsPalletOpen] = useState(true);
  const [showScreenLoader, setShowScreenLoader] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [selectedCateObj, setSelectedCateObj] = useState({});
  const [currentQuestionId, setCurrentQuestionId] = useState(0);
  const [loaderText, setLoaderText] = useState({
    loaderShowHide: false,
    loaderText: "",
  });
  const [showAnalysisOnly, setShowAnalysisOnly] = useState(false);
  const [palletQuestionBoxData, setPalletQuestionBoxData] = useState([]);
  const [palletLoading, setPalletLoading] = useState(true);
  const [filterArray, setFilterArray] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("Words in Context");
  const [selectedCategory2, setSelectedCategory2] = useState("All");
  const [palletQuestionCorrectIncorrect,setPalletQuestionCorrectIncorrect] = useState([]);  

  const options2 = Object.keys(filterArray).map((key) => ({
    link: filterArray[key].asc,
    name: key,
  }));

  const togglePanel = () => {
    if (!disabled) {
      setIsPalletOpen((prev) => !prev);
      setShowScreenLoader((prev) => !prev);
      setLoaderText({ loaderShowHide: false, loaderText: "" });
    }
  };

  const handleQuestionClick = useCallback(
    async (platformLink, questionNo, questionId) => {
      setIsPalletOpen(false);
      setQuestionAreaVisible(false);
      setShowScreenLoader(true);
      setLoaderText({ loaderShowHide: true, loaderText: "Please wait while we are loading..." });
      setDisabled(true);

      try {
        const data = await FetchQuestionDataApi(platformLink, questionNo);

        if (data.success) {
          const analysisAvailable = data?.testData[0]?.sectionsData[0]?.questions[0].attemptsData?.analysisData; 
          setShowAnalysisOnly(!!analysisAvailable);
          setCurrentQuestionId(questionId);
          setQuestionsDataLoaded(data);
          setCurrentQuestionNo(questionNo);
          setQuestionAreaVisible(true);
        } else {
          alert("No Record Found!");
        }
      } catch (error) {
        console.error("Error fetching question data:", error);
      } finally {
        setShowScreenLoader(false);
        setDisabled(false);
      }
    },
    []
  );

  const handlePalletDataLoad = async (selectedCategoriesObj) => {
    setQuestionAreaVisible(false);
    setShowScreenLoader(true);
    setPalletLoading(true);
    setLoaderText({ loaderShowHide: false, loaderText: "" });
    setPalletQuestionBoxData([]);

    if (selectedCategoriesObj.selectCategory === "filter") {
      setSelectedCategory2(selectedCategoriesObj.subCatName);
    } else {
      setSelectedCategory(selectedCategoriesObj.subCatName);
    }

    handlePalletLoadApi(
      selectedCategoriesObj.payLoadLink,
      selectedCategoriesObj.cateId,
      selectedCategoriesObj.subCatId
    );
  };

  const handlePalletLoadApi = useCallback(async (payLoads, selectedCateId, subCatId) => {
    setDisabled(true);

    try {
      const data = await PracticeQuePalletApi(payLoads);

      if (data.success) {
        setPalletQuestionBoxData(data);

        if (data.categoryNamesArray) {
          const categories = data.categoryNamesArray
            .filter((category) => category.subCats && category.subCats.length > 0)
            .map((category) => ({
              value: category.cateId,
              label: category.name,
              subCatArr: category.subCats,
            })); 
            setSectionName(data.categoryNamesArray[0].name);
            setCategoryNamesArray(categories);
            setFilterArray(
              data.categoryNamesArray
                .filter((category) => category.cateId === selectedCateId)[0]
                ?.subCats.filter((subCat) => subCatId === subCat.cateId)[0]?.filterLinks
            );
        }
      } else {
        alert("No record Found!");
      }
    } catch (error) {
      console.error("Error fetching question data:", error);
    } finally {
      setPalletLoading(false);
      setDisabled(false);
    }
  }, []); 
  useEffect(() => {
    const payLoads = "Y2twbGZPaHpgcG56fDokIiUjOCEvZHRmcE52PDckMSMlNz9uZG1xXGBmdG12cygiM2B8c3tzWXt4bmY8PjJ7fGZ3cGFpWHB+YCpge2Zie3Z8fW80b255ZnB1Rnh+cTVyeG8/fntpenpseG97R2J5fXt0XH00PiUrJTYiJ31xa2d9bHdbd3xsMzU=";
    setSelectedCateObj({ cateId: "909010", subCatId: "909014" });
    handlePalletLoadApi(payLoads, "909010", "909014");
  }, [handlePalletLoadApi]);

  return (
    <>
      {questionAreaVisible && (
        <QuestionArea
          questionAreaProps={{
            questionsDataLoaded,
            currentQuestionNo,
            currentQuestionId,
            handleQuestionClick,
            palletQuestionBoxData,
            questionAreaVisible,
            showAnalysisOnly,
            setShowAnalysisOnly,
            setPalletQuestionCorrectIncorrect,
            itemsRef,
            sectionName
          }}
        />
      )}

      {showScreenLoader && (
        <FullScreenLoader loaderShowHide={loaderText.loaderShowHide} text={loaderText.loaderText} />
      )}

      <div
        className={`pallet-button ${isPalletOpen ? "pallet-button-move" : ""} ${disabled ? "disabledEvents" : ""}`}
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

      <div className={`side-panel ${isPalletOpen ? "open" : ""}`}>
        <div className="select-pallet-tag">
          {palletLoading ? (
            <>
              <div className="filterDropdown loading">
                <div className="selectedVal">Please select a value</div>
              </div>
              <div className="filterDropdown loading">
                <div className="selectedVal">Please select a value</div>
              </div>
            </>
          ) : (
            <>
              <SelectComponent
                options={categoryNamesArray}
                onSelectChange={handlePalletDataLoad}
                defaultText={selectedCategory}
                className={palletLoading ? "loading" : ""}
                selectedCateObj={selectedCateObj}
                setSelectedCateObj={setSelectedCateObj}
              />
              <SelectComponent
                options={options2}
                onSelectChange={handlePalletDataLoad}
                defaultText={selectedCategory2}
                className={palletLoading ? "loading" : ""}
                selectedCateObj={selectedCateObj}
                setSelectedCateObj={setSelectedCateObj}
              />
            </>
          )}
        </div>

        <div className="question-box-container">
          {palletQuestionBoxData.questionsData?.length > 0
            ? palletQuestionBoxData.questionsData.map((queData, index) => { 

                let questionResult = queData.attemptsData?.[0]?.analysisData?.result || 0; 
                
                const submitUpdateResult = palletQuestionCorrectIncorrect?.filter((data) => data.currentQuestionNo === index);  
                if (submitUpdateResult.length > 0) {  
                  if(submitUpdateResult[0].quesRightAns == submitUpdateResult[0].selectedAnswers){
                    questionResult = 1;
                  }else{
                    questionResult = 2;
                  }   
                  updateItem(index,{questionResult:questionResult,answerGiven:submitUpdateResult[0].selectedAnswers})    
                }
                
                // const resultClass = questionResult === 1 ? "correct-Ques" : questionResult === 2 ? "incorrect-Ques" : "";

                // const quesPayloadLink = questionResult > 0 ? queData.analysisLink : queData.platformLink;  

                // Check if questionResult exists using optional chaining
               questionResult = itemsRef?.current[index]?.[0] ? itemsRef?.current[index]?.[0]?.questionResult  : questionResult; 
              // Determine the class based on questionResult
              const resultClass =
                questionResult === 1
                  ? "correct-Ques"
                  : questionResult === 2
                  ? "incorrect-Ques"
                  : ""; 
              // Determine the link based on questionResult
              const quesPayloadLink =  questionResult > 0 ? queData.analysisLink : queData.platformLink;

                return (
                  <div
                    key={queData.questionId}
                    className={`ques-box ${index === currentQuestionNo && questionAreaVisible ? "disabledEvents" : ""} ${resultClass}`}
                    onClick={() => {
                      if (!questionAreaVisible || index !== currentQuestionNo) {
                        handleQuestionClick(quesPayloadLink, index, queData.questionId);
                      }
                    }}
                  >
                    <span>{queData.questionNo}</span>
                  </div>
                );
              })
            : Array.from({ length: 55 }, (_, i) => (
                <div key={i} className="ques-box loading">
                  <span>{i + 1}</span>
                </div>
              ))}
        </div>
      </div>
    </>
  );
}
