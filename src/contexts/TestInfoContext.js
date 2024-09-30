import React, { createContext, useEffect, useReducer, useState } from 'react'

export const TestInfoContext = createContext(null);

export default function TestInfoContextProvider({ children }) {
    const [TestInfo, setTestInfo] = useState(false);

    useEffect(() => {
        const testInfoData = { "teatName": "SAT", "section": "Verbal" ,"testTime" : "10"}
        setTestInfo(testInfoData);
    },[]) // Empty dependency array to run only once on mount

    return (
        <TestInfoContext.Provider value={{ TestInfo }}>
            {children}
        </TestInfoContext.Provider>
    )
}