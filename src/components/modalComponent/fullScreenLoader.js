import React from 'react';
import './FullScreenLoader.css'; // Import the CSS file for styling

const FullScreenLoader = () => {
    return (
        <div className="fullscreen-loader">
            <div className="loader"></div>
            <h2>Please wait...</h2>
        </div>
    );
};

export default FullScreenLoader;
