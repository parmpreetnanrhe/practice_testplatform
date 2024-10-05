import React from 'react'

export const Question_heading = ({currentQuestionCount}) => {
  return (
    <div className='question-header'>
        <div className='ques-cnt'>{currentQuestionCount}</div>
        <div className='abc-badging'><span>ABC</span></div>
    </div>
  )
}
