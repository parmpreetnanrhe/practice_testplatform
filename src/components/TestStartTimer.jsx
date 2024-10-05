import React, { createContext, useEffect, useState } from 'react';

export const TestStartTimerContext = createContext(null);

export default function TestStartTimerProvider({ children }) {  
    const [testTimeSpent, setTestTimeSpent] = useState(0); 

    useEffect(() => {  
        const countdown = setInterval(() => {
            setTestTimeSpent(prevTime => prevTime + 1);
        }, 1000);
        
        // Clear the interval when the component is unmounted
        return () => clearInterval(countdown);
    }, []);

    // Format the time spent in "minutes:seconds" format
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds} ${minutes > 0 ? 'min' : 'sec'}`;
    };

    return (
        <TestStartTimerContext.Provider value={{ formatTime, testTimeSpent }}>
            {children}
        </TestStartTimerContext.Provider>
    );
}
