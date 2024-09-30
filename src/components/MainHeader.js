import React from "react";
import { Button } from "./Button";
import { Headings } from "./Headings";

export const MainHeader = () => {

  return (
    <header className="header">
      <div>
        <Headings
          type={1}
          title="Main Title"
          className="headerTitle"
          text="Welcome to My Site"
        />
      </div>
      <div>
        <Button
          type="button"
          title="Dashboard"
          className="commonBtn"
          onClick={() => console.log("Submit clicked!")}
        >
          Dashboard
        </Button>
      </div>
    </header>
  );
};
