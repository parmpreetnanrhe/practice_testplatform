import React, { useContext, useEffect, useState } from 'react';
import { TestInfoContext } from '../contexts/TestInfoContext';
import SubHeader from './SubHeader';
export default function TestStartTimer() {
    const testInfo = useContext(TestInfoContext);
    const [testTimeSpending, setTestTimeSpending] = useState(0);

    useEffect(() => { 
        const countdown = setInterval(() => {
            setTestTimeSpending(prevTime => prevTime + 1);
        }, 1000);

    }, []); 

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <>
            <SubHeader testTimeStarts={formatTime(testTimeSpending)}></SubHeader>
        </>
        // <div>
        //     <h1>Test Start Timer</h1>
        //     {timeLeft > 0 ? (
        //         <p>Time Left: {formatTime(timeLeft)}</p>
        //     ) : (
        //         <p>Test Completed or Time Over</p>
        //     )}
        // </div>
    );
}
