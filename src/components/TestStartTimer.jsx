import React, { useContext, useEffect, useState } from 'react';
import { TestInfoContext } from '../contexts/TestInfoContext'; 
import QuestionArea from './QuestionArea';
export default function TestStartTimer() {
    const testInfo = useContext(TestInfoContext);
    const [testTimeSpending, setTestTimeSpending] = useState(0);
    
    useEffect(() => {  
        const countdown = setInterval(() => {
            setTestTimeSpending(prevTime => prevTime + 1);
        }, 1000);
        return () => clearInterval(countdown);
    }, []);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds} ${minutes > 0 ? 'min' : 'sec'}`;
    }; 

    return (
        <> 
            <QuestionArea testTimeStarts={formatTime(testTimeSpending)}/>
        </>
    );
}
