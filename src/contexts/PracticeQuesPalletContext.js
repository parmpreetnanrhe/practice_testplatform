import React, { createContext, useEffect, useState } from 'react';
import { PracticeQuePalletApiGeneric } from '../apis/PracticeQuePalletApiGeneric';
import TestStartTimer from '../components/TestStartTimer';
import FullScreenLoader from '../components/modalComponent/fullScreenLoader';
import Pallet from '../components/Pallet';

export const PracticeQuesPallet = createContext(null);

export const PracticeQuesPalletContextProvider = ({ children }) => {
    const [palletQueData, setPalletQueData] = useState([]);
    const isDataAvailable = palletQueData && Object.keys(palletQueData).length > 0;
    return (
        <>
            <PracticeQuesPallet.Provider value={palletQueData}>
                <PracticeQuePalletApiGeneric setPalletQueData={setPalletQueData} />
                
                { isDataAvailable ? (
                   <Pallet />
                ) : (
                    <FullScreenLoader/> 
                )}

                {children}
            </PracticeQuesPallet.Provider>
        </>
    );
};
