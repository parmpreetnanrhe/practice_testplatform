import React from 'react'

export const Question_heading = ({onClick, currentQuestionCount}) => {
  

  return (
    <div className='question-header'>
        <div className='ques-cnt'>{currentQuestionCount}</div>
        <div onClick={onClick} className='abc-badging'><span>ABC</span></div>
    </div>
  )
}
