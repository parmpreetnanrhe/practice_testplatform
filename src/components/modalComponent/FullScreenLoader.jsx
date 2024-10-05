import React from 'react';
import './FullScreenLoader.css'; // Import the CSS file for styling

const FullScreenLoader = ({text}) => {
    return (
        <div className="fullscreen-loader"> 
            <h2>{text}</h2>
        </div>
    );
};

export default FullScreenLoader; 
