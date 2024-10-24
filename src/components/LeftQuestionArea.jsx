import React, { useCallback, useEffect, useRef, useState } from "react";
import { Headings } from "./Headings";
import { TCY_URL } from "../config/commonFunctions/Constants";

export default function LeftQuestionArea({
  questionPassageSts,
  passageContent,
}) {
  const iframeRef = useRef(null);  
  return (
    <div className="question-container left-question-area">
      {questionPassageSts && passageContent}
    </div>
  );
}
