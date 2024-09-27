import React from "react";
import { Button } from "./Button";
import { Headings } from "./Headings";

export default function SubHeader() {
  return (
    <header className="sub-header">
      <div>
        <Headings
          type={1}
          title="Main Title"
          className="main-title"
          text="Verbal Ability | Question: 55"
        />
      </div>
      <div>
        <Headings
          type={2}
          title="Timer"
          className="timerTitle"
          text="10:20 min"
        />
      </div>
      <div class="subHeaderIconBar">
        <Button
          type="button"
          title="Flag"
          className="commonBtn iconBtn"
          onClick={() => console.log("Submit clicked!")}
        >
          <img
            src={`${process.env.PUBLIC_URL}/img/flagIcon.svg`}
            alt="Flag Icon"
          />
          <span>Flag</span>
        </Button>
        <Button
          type="button"
          title="Calculator"
          className="commonBtn iconBtn"
          onClick={() => console.log("Submit clicked!")}
        >
          <img
            src={`${process.env.PUBLIC_URL}/img/calcIcon.svg`}
            alt="Calculator Icon"
          />
          <span>Calculator</span>
        </Button>

        <Button
          type="button"
          title="References"
          className="commonBtn iconBtn"
          onClick={() => console.log("Submit clicked!")}
        >
          <img
            src={`${process.env.PUBLIC_URL}/img/referIcon.svg`}
            alt="References Icon"
          />
          <span>References</span>
        </Button>
      </div>
    </header>
  );
}
