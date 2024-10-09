/* global Desmos */
import React, { useContext, useEffect, useRef, useState } from "react";
import './CalcModal.css';

export default function CalcModal({isOpen, showCalc}) {
  const calculatorRef = useRef(null); // To hold the calculator instance
  const calcContainerRef = useRef(null); // To hold the div where Desmos will be embedded
  const divRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const [position, setPosition] = useState({ x: 0, y: 50 });
  const [dragging, setDragging] = useState(false);
  const [expended, setExpended] = useState({expendDiv: false, width: '30%'});
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e, dimensions) => {
    if (dragging) {
      const newX = e.clientX - offset.x;
      const newY = e.clientY - offset.y;

      // Get viewport width and height
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Get the width and height of the draggable div
      const boxWidth = dimensions.width+10; // Replace with your box's width
      const boxHeight = dimensions.height+10; // Replace with your box's height

      // Limit the position to prevent overflow (don't allow dragging out of viewport)
      const constrainedX = Math.max(0, Math.min(newX, viewportWidth - boxWidth));
      const constrainedY = Math.max(0, Math.min(newY, viewportHeight - boxHeight));

      setPosition({
        x: constrainedX,
        y: constrainedY,
      });
    }
  };

  const handleMouseUp = () => {
    console.log('a')
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

  useEffect(() => {
    if (isOpen) {
      console.log(divRef.current)
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

      if (divRef.current) {
        console.log(divRef.current.getBoundingClientRect())
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

  const expendDiv = () => {
    console.log(expended.expendDiv)
    if (expended.expendDiv) {
      const { expendDiv, width } = {expendDiv: false,width:'30%'}
      setExpended({ expendDiv, width });
    } else {
      const { expendDiv, width } = {expendDiv: true,width:'70%'}
      setExpended({ expendDiv, width });
    }
  }

  if (!isOpen) return null; // Don't render the modal if not open
  return (
    <div className="calcModal" onMouseMove={(event)=>handleMouseMove(event, dimensions)} onMouseUp={handleMouseUp} style={{left: position.x, top: position.y, width: expended.width}} ref={divRef}>
      <div className="calcHeader">
        <div className="title">Calculator</div>
        <div className="dragTitle">
          <img onMouseDown={handleMouseDown}
            src={`${process.env.PUBLIC_URL}/img/dragImg.svg`}
            alt="Drag Icon"
          />
        </div>
        <div className="expendClose">
          <img
              onClick={()=>expendDiv()}
              src={`${process.env.PUBLIC_URL}/img/expandImg.svg`}
              alt="Expend Icon"
          />
          <img
            onClick={()=>showCalc()}
            src={`${process.env.PUBLIC_URL}/img/calcCross.svg`}
            alt="Cross Icon"
          />
        </div>
      </div>
      <div className="modal-content" ref={calcContainerRef}>        
      </div>
    </div>
  );
};