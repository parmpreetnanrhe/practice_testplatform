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
    const handlePalletLoadApi = async (payLoads) => {
        await PracticeQuePalletApi(payLoads)
            .then(data => {
                if (data.success == 0) {
                    alert("Something went wrong in pallet API!");
                } else {
                    setPalletQueData(data);
                }
                setLoading(false);
                setError(error);
            })
            .catch(error => console.error('Error fetching question data:', error));
    }
   
    const payLoads = "Y2twbGZPaHpgcG56fDokIiUjOCEvZHRmcE52PD8kOCMkMD98em17ekl+bGFxOiU0ZGZtYX1uenxmRXdtYXpvR3s+an9rbWJna3Ane2p1YXt7dFxreWIoc2Zkd29qfWZ0MmVwY3ppe1p8Z2Q1ZGt5NHR5aWpbYmRncHRmPD8=";
   
    useEffect(() => {
        handlePalletLoadApi(payLoads);
    }, [])

    return (
        <>
            <PracticeQuesPallet.Provider value={{ palletQueData, loading, error, handlePalletLoadApi, setLoading }}>
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
