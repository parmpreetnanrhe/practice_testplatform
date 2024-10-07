/* global Desmos */
import React, { useContext, useEffect, useRef, useState } from "react";
import './CalcModal.css';

export default function CalcModal({isOpen, showCalc}) {
  const calculatorRef = useRef(null); // To hold the calculator instance
  const calcContainerRef = useRef(null); // To hold the div where Desmos will be embedded

  // Load Desmos script dynamically
  const loadDesmosScript = () => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `${process.env.PUBLIC_URL}/js/calculator.js`;
      script.async = true;
      document.body.appendChild(script);
      script.onload = resolve;
      script.onerror = reject;
    });
  };

  useEffect(() => {
    if (isOpen) {
      const elt = calcContainerRef.current;
      if (typeof Desmos == 'undefined') {
        loadDesmosScript()
        .then(() => {
          if (calcContainerRef.current) {
            const elt = calcContainerRef.current;
            const calculator = Desmos.GraphingCalculator(elt);
            calculatorRef.current = calculator;
          }
        })
        .catch((error) => console.error('Error loading Desmos script:', error));
      } else {
        const calculator = Desmos.GraphingCalculator(elt);
        calculatorRef.current = calculator;
      }

      return () => {
        if (calculatorRef.current) {
          calculatorRef.current.destroy(); // Clean up the calculator when the modal closes
        }
      };
    }
  }, [isOpen]);

  if (!isOpen) return null; // Don't render the modal if not open
  return (
    <div className="calcModal">
      <div className="calcHeader">
        <div className="title">Calculator</div>
        <div className="dragTitle"></div>
        <div className="expendClose">
          <span className="close" onClick={()=>showCalc()}>
            &times;
          </span>
        </div>
      </div>
      <div className="modal-content" ref={calcContainerRef}>        
      </div>
    </div>
  );
};