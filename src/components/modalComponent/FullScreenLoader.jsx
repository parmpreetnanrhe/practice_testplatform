import React from 'react';
import './FullScreenLoader.css'; // Import the CSS file for styling

const FullScreenLoader = ({loaderShowHide,text}) => {
    return (
        <div className="fullscreen-loader"> 
            {loaderShowHide && ( 
              <img src="https://tcyonline.com/testPlatforms/platforms/PTETestPlatform/images/TestPlatformLoading.gif"></img>
            )}
            <h2>{text}</h2>
        </div>
    );
};

export default FullScreenLoader; 
