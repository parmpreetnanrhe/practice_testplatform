import React, { createContext, useEffect, useReducer, useState } from 'react'
import { questionData } from '../questionsData';

export const QuestionDataContext = createContext(null);

export default function QuestionDataContextProvider({ children }) {
    const [questionDatainfo ,setQuestionData] = useState(false);

    useEffect(() => { 
        setQuestionData(questionData);
    },[]) // Empty dependency array to run only once on mount

    return (
        <QuestionDataContext.Provider value={{ questionDatainfo }}>
            {children}
        </QuestionDataContext.Provider>
    )
}