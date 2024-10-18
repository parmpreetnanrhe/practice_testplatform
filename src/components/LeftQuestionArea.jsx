import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Headings } from './Headings';
import { TCY_URL } from '../config/commonFunctions/Constants';

export default function LeftQuestionArea({ passageContent }) {
  const iframeRef = useRef(null);
  const [fileContent, setFileContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 

  return (
    <div className='left-question-area'> 
      {passageContent}
    </div>
  );
}
