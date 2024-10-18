/* global Desmos */
import React, { useEffect, useRef, useState } from "react";
import './CalcModal.css';

export default function CalcModal({ isOpen, showCalc }) {
  const calculatorRef = useRef(null); // To hold the calculator instance
  const calcContainerRef = useRef(null); // To hold the div where Desmos will be embedded
  const divRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const [position, setPosition] = useState({ x: 0, y: 50 });
  const [dragging, setDragging] = useState(false);
  const [expendDiv, setExpendDiv] = useState({ isExpend: false, width: '30%' });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const box = document.querySelector('.calcModal');

  // Handle mouse down event to initiate dragging
  const handleMouseDown = (e) => {
    box.classList.remove("hand"); 
    box.classList.add('holding');
    
    setDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  // Handle mouse move event to update position during dragging
  const handleMouseMove = (e) => {
    if (dragging) {
      const newX = e.clientX - offset.x;
      const newY = e.clientY - offset.y;

      // Get viewport dimensions
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Get the dimensions of the modal
      const boxWidth = dimensions.width + 10; // Box width
      const boxHeight = dimensions.height + 10; // Box height

      // Constrain the position within the viewport
      const constrainedX = Math.max(0, Math.min(newX, viewportWidth - boxWidth));
      const constrainedY = Math.max(0, Math.min(newY, viewportHeight - boxHeight));

      setPosition({
        x: constrainedX,
        y: constrainedY,
      });
    }
  };

  // Handle mouse up event to stop dragging
  const handleMouseUp = () => { 
    box.classList.remove("holding"); 
    box.classList.add('hand');
    setDragging(false);
  };

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

  // Load Desmos calculator and update dimensions
  useEffect(() => {
    if (isOpen) {
      const elt = calcContainerRef.current;
      if (typeof Desmos === 'undefined') {
        loadDesmosScript()
          .then(() => {
            if (calcContainerRef.current) {
              const calculator = Desmos.GraphingCalculator(elt);
              calculatorRef.current = calculator;
            }
          })
          .catch((error) => console.error('Error loading Desmos script:', error));
      } else {
        const calculator = Desmos.GraphingCalculator(elt);
        calculatorRef.current = calculator;
      }

      if (divRef.current) {
        const { width, height } = divRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }

      return () => {
        if (calculatorRef.current) {
          calculatorRef.current.destroy(); // Clean up the calculator when the modal closes
        }
      };
    }
  }, [isOpen]);

  // Add event listeners for mouse move and mouse up
  useEffect(() => {
    if (dragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging]);

  // Toggle expand/collapse of the modal
  const toggleExpend = () => {
    setExpendDiv((prev) => ({
      isExpend: !prev.isExpend,
      width: prev.isExpend ? '30%' : '70%',
    }));
  };

  if (!isOpen) return null; // Don't render the modal if not open

  return (
    <div
      className="calcModal hand"
      onMouseDown={handleMouseDown}
      style={{
        left: position.x,
        top: position.y,
        width: expendDiv.width,
      }}
      ref={divRef}
    >
      <div className="calcHeader">
        <div className="title">Calculator</div>
        <div className="dragTitle"> 
          <div className="more-vertical">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div> 
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div> 
          </div> 
        </div>
        <div className="expendClose">
          <img
            onClick={toggleExpend}
            src={`${process.env.PUBLIC_URL}/img/expandImg.svg`}
            alt="Expand Icon"
          />
          <img
            onClick={showCalc}
            src={`${process.env.PUBLIC_URL}/img/calcCross.svg`}
            alt="Close Icon"
          />
        </div>
      </div>
      <div className="modal-content" ref={calcContainerRef}></div>
    </div>
  );
}
