import React, { createContext, useEffect, useState } from 'react';
import { PracticeQuePalletApi } from '../apis/PracticeQuePalletApi';
import Pallet from '../components/Pallet';

export const PracticeQuesPallet = createContext(null);

export const PracticeQuesPalletContextProvider = ({ children }) => {
    const [palletQueData, setPalletQueData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const isDataAvailable = palletQueData && Object.keys(palletQueData).length > 0;

    // Fetch question data when a question-box is clicked
    const handlePalletLoadApi = async () => {
        await PracticeQuePalletApi()
            .then(data => {
                setPalletQueData(data);
                setLoading(false);
                setError(error); 
            })
            .catch(error => console.error('Error fetching question data:', error));
    }
    
    useEffect(()=>{
        handlePalletLoadApi(); 
    },[])

    return (
        <>
            <PracticeQuesPallet.Provider value={{ palletQueData, loading, error }}>
                {/* <PracticeQuePalletApi setPalletQueProps={{ setPalletQueData, setLoading, setError }} /> */}
                <Pallet />
                {/* { isDataAvailable ? (
                   <Pallet />
                ) : (
                    <FullScreenLoader/> 
                )} */}

                {children}
            </PracticeQuesPallet.Provider>
        </>
    );
};
