import React, { useContext, useEffect, useState } from 'react'
import { Button } from './Button'
import SelectComponent from './SelectComponent';
import { PracticeQuesPallet } from '../contexts/PracticeQuesPalletContext';
import axios from 'axios';
import QuestionArea from './QuestionArea';

export default function Pallet({ pallteclickdOnQuestion, currentQuestionIndex }) {
  const [isPalletOpen, setIsPalletOpen] = useState(true);
  const [categoryNamesArray, setCategoryNamesArray] = useState([]);
  const [questionsData, setQuestionData] = useState([]);
  const [questionsDataLoaded, setquestionsDataLoaded] = useState([]);
  const palletData = useContext(PracticeQuesPallet);
  const [isNewComponentVisible, setIsNewComponentVisible] = useState(false);

  const optionsArray = ['All', 'Correct', 'Incorrect', 'Un-attempted', 'Flagged'];
  const options2 = optionsArray.map((option, index) => ({
    value: index,
    label: option
  }));

  const togglePanel = () => {
    setIsPalletOpen(!isPalletOpen);
  };
  useEffect(() => {
    setQuestionData(palletData.questionsData);

    if (palletData && palletData.categoryNamesArray) {
      const categoriesWithSubCats = palletData.categoryNamesArray.filter(category =>
        category.subCats && category.subCats.length > 0
      );
      const categories = categoriesWithSubCats.map((data) => ({
        value: data.cateId,
        label: data.name,
      }));
      setCategoryNamesArray(categories);
    }
  }, [palletData])




  const payload = {
    // payLoads: "YGZqe0doNDw8Izk9MCFienxwYFFoc3B1enVrPD8kOCMkMD97a399R3ZHc2lmc3xxcEdtYX06JDRhYmF1WnVjdnpKfTI7Ojg+NiUyOCNyZndnWmwvPT4jKyAxNHJhZnx6emRNdn5pNGpgZGJta2N8fHI1bntlc3BgQX5iZDN1ZH8yb3h8el18a3ZjaGdrSXovJCIuY3xiZmZ8aHxCb2BtdHtxYDI/PDk+NSQneXBiZmZ8fGZcZjokNGRyd3J6fWd9WmxNYF1kZnk4Jid5cGJmZnx8ZlttOi0mIzQhOQ==",
    dev: 10,
    platform: "android",
    app_flag: 11,
    app_type: "mycoach",
    client_id: 5480,
    version: 93,
    device_id: "587831233a4827f7",
    device_details: "MANUFACTURER=samsung MODEL=SM-E225F RELEASE=13 SDK=TIRAMISUDevice Id TP1A.220624.014",
    user_type: 0,
    user_idd: 496956,
    user_id: 496956,
    beta_idd: 496956,
    beta_id: 496956,
    cms_id: 496956
  };



  const fetchData = async (payLoads) => {
    payload.payLoads = payLoads;
    try {
      const response = await axios.post(
        'app/api/practiceQueDataFetchApiGeneric.php',
        payload,
        {
          headers: {
            "Content-Type": "application/json", "Access-Control-Allow-Origin": "*",
          },
        }
      );
      setquestionsDataLoaded(response.data);
      setIsNewComponentVisible(true);
      togglePanel();
    } catch (err) {
      // setError(err.message);
    } finally {
      // setLoading(false);
    }
  };


 
  return (
    <>
     {(isNewComponentVisible)  && 
      <QuestionArea questionsDataLoaded={questionsDataLoaded} />
    }
      <div className={`pallet-button ${isPalletOpen ? 'pallet-button-move' : ''}`}>
        <Button
          type="button"
          title="Expand"
          className="right-button"
          text="<"
          onClick={togglePanel} >
          <img
            src={`${process.env.PUBLIC_URL}/img/whitebackicon.svg`}
            style={isPalletOpen ? { transform: 'rotate(539deg)' } : {}}
            alt="Arrow Icon"
          />
        </Button>
      </div>
      <div className={`side-panel ${isPalletOpen ? 'open' : ''}`}>
        <div className="select-pallet-tag">
          <SelectComponent
            options={categoryNamesArray}
            onSelectChange=""
            defaultText="Please select a value"
          />
          <SelectComponent
            options={options2}
            onSelectChange=""
            defaultText="Please select a value"
          />
        </div>
        <div className='question-box-container'>
          {questionsData && questionsData.length > 0 && (
            questionsData.map((queData, index) => (
              <div key={queData.questionId}
                className={`ques-box ${queData.questionNo == currentQuestionIndex ? "quesActive" : ""}`}
                onClick={() => fetchData(queData.platformLink)}><span>{queData.questionNo}</span></div>
            )
            ))}

        </div>
      </div>
    </>
  )
}
