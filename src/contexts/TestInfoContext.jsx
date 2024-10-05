import React, { createContext, useEffect, useReducer, useState } from 'react'

export const TestInfoContext = createContext(null);

export default function TestInfoContextProvider({ children }) {
    const [TestInfo, setTestInfo] = useState(false);
 
 
    const [testTimeSpending, setTestTimeSpending] = useState(0);
    
    useEffect(() => {  
        const countdown = setInterval(() => {
            setTestTimeSpending(prevTime => prevTime + 1);
        }, 1000);
        return () => clearInterval(countdown);
    }, []);

    const formatTime = ((seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds} ${minutes > 0 ? 'min' : 'sec'}`;
    })(testTimeSpending);  


    return (
        <TestInfoContext.Provider value={{ formatTime }}>
            {children}
        </TestInfoContext.Provider>
    )
}