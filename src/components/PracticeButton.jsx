import React, { useState } from 'react'

function PracticeButton({incremenet , falg}) {
    console.log('PracticeButton rendring..')
    const [cnt,Setcnt] = useState(false);

    const handleClick = () => {
        incremenet();
        Setcnt(true);
    };
    
  return (
    <button onClick={handleClick}>PracticeButton{falg ? "true":"false"}</button>
  )
}

export default React.memo(PracticeButton)