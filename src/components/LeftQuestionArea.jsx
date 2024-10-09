import React, { useEffect, useRef, useState } from 'react'
import { Headings } from './Headings'
import { TCY_URL } from '../commonFunctions/Constants'
import parse from "html-react-parser";

export default function LeftQuestionArea({passageContent}) {

  const iframeRef = useRef(null);

  const [fileContent, setFileContent] = useState('');

  useEffect(() => {
    // Fetching a file from the server
    const path = TCY_URL+passageContent;
    fetch(path)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then((data) => {
        setFileContent(data);
      })
      .catch((error) => {
        console.error('Error fetching file:', error);
      });
  }, [fileContent]);
 
  return (
    <>
    <div className='left-question-area'>  
         {parse(fileContent)}
    </div>
    </>
  )
}
