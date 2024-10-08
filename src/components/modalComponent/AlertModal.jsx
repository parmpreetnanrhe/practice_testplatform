import React, { useState } from "react";
import "../../css/variables.css";
import "./AlertModal.css";
import { Button } from "../Button";

export default function AlertModal({ message, isSubmitTest }) {
  const closeModal = () => {
    isSubmitTest.setIsSubmit((prevState) => ({
      ...prevState,
      modalShowHideStatus: false,
    })); // Hide the modal when called
  };
 
  let buttonText;
  if (isSubmitTest.isSubmit.continueBtnShow) {
    buttonText = "Continue";
  } else {
    buttonText = "OK";
  }

  const handleClick = () => {
    if (isSubmitTest.isSubmit.continueBtnShow) { 
        isSubmitTest.setIsSubmit((prevState) => ({
            ...prevState, 
            continueBtnClicked : true
          }));   
    } else {
      closeModal();
    }
  };
  return (
    <div>
      {isSubmitTest.isSubmit.modalShowHideStatus && (
        <div className="modalBox">
          <div className="modalContent">
            <div className="modalHeader">
              <h4>Alert!</h4>
            </div>
            <div className="modalBody">{message}</div>
            <div className="modalFooter">
              <Button
                type="button"
                title={buttonText}
                className="btn"
                onClick={handleClick}
              >
                {" "}
                {buttonText}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
