import React, { useContext, useEffect, useRef, useState } from "react";
import "./Annotate.css";

export default function Annotate({ isOpenAnnotate, selectedText, setIsOpenAnnotate, textAreaValue, setTextAreaValue, saveAnnotate, isNewAnnotate, deleteAnnotate }) {

  const [isDeleted, setIsDeleted] = useState(false);

  const closeAnnotate =() => {
    const marks = document.querySelectorAll('mark');
      marks.forEach(mark => {
        mark.classList.remove('active');
      });
    setIsOpenAnnotate(false);
    setTextAreaValue('');
    setIsDeleted(false);
  }

  const handleTextAreaChange = (event) => {
    setTextAreaValue(event.target.value);
  };

  const confirmDeleteAnnotate = () => {
    setIsDeleted(!isDeleted);
  }


  if(!isOpenAnnotate) return null;
  return (
      <div id="SelectionTextareaSec">
        <div className="selectionTopBar">
          <div className="selectedText">
            <b>View/Edit:-</b>{" "}
            "<span className="showSelectedText">{selectedText}</span>"
          </div>
          <img
            className="closeSelectionBar"
            onClick={()=>closeAnnotate()}
            src={`${process.env.PUBLIC_URL}/img/calcCross.svg`}
            alt="Cross Icon"
          />
        </div>

        <div className="SelectionTextarea">
          <div className="annotateForm">
            <div className="selectionDesign">
              <div className="highlightColor">
                <div className="sTitle">Highlight Color:-</div>
                <div className="highlightDesign">"concentrer sur la mise"</div>
              </div>

              <div className="highlightColor">
                <div className="sTitle">Underline style:-</div>
                <div className="underLineDesign">Dummy</div>
              </div>
            </div>
            <textarea value={textAreaValue} onChange={handleTextAreaChange} id="selectionTextarea" spellCheck="false"></textarea>
            <div className="selectionBtn">
              <button onClick={saveAnnotate} className="commonBtn submitSelection" type="button">
                Save
              </button>
              {isNewAnnotate && (
                <button onClick={()=>closeAnnotate()} className="commonBtn cancelSelection" type="button">
                  Cancel
                </button>
              )}
              {!isNewAnnotate && (
                <img onClick={confirmDeleteAnnotate} className="deleteAnnotate"
                  src={`${process.env.PUBLIC_URL}/img/deleteIcon.svg`}
                  alt="Delete"
                />
              )}
            </div>
          </div>

          {isDeleted && (
            <div className="deleteConfirmation">
              <div className="deleteAnnotateSec">
                <h1>Are You Sure You Want to Delete This Annotation?</h1>
                <p>
                  Once you delete this annotation, any notes you've made will no
                  longer be available.
                </p>
                <div className="confirmationBtn">
                  <button onClick={confirmDeleteAnnotate} type="button" className="commonBtn keep_annotation">
                    Keep Annotation
                  </button>
                  <button onClick={()=>{deleteAnnotate();confirmDeleteAnnotate()}} type="button" className="commonBtn delete_annotation">
                    Delete Annotation
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
  );
}
