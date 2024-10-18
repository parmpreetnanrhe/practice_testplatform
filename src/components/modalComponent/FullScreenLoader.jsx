import React from 'react';
import './FullScreenLoader.css'; // Import the CSS file for styling
import {IMAGE_URL} from "../../config/commonFunctions/Constants";

const FullScreenLoader = ({loaderShowHide,text}) => {
    return (
        <div className="fullscreen-loader"> 
            {loaderShowHide && ( 
              <img src={IMAGE_URL}></img>
            )}
            <h2>{text}</h2>
        </div>
    );
};

export default FullScreenLoader; 
