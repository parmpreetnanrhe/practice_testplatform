import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Headings } from './Headings';
import { TCY_URL } from '../commonFunctions/Constants';
import parse from "html-react-parser";

export default function LeftQuestionArea({ passageContent }) {
  const iframeRef = useRef(null);
  const [fileContent, setFileContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 

  return (
    <div className='left-question-area'> 
      {parse(passageContent)}
    </div>
  );
}
