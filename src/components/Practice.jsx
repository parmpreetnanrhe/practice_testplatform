import React, { useCallback, useState } from "react";
import PracticeButton from "./PracticeButton";

function Practice() {
  const [counter, setCounter] = useState(0); 
  const [falg, setFlag] = useState(true); 
  const incremenet = useCallback(() => {
    setCounter((prev) => prev + 1);
    setFlag((flag)=>!flag)
  },[]);

  return <div><div>counter:{counter}</div><br /><PracticeButton incremenet={incremenet} falg={falg}/></div>;
}

export default Practice;
