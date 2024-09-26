import React from 'react';
import { Button } from './Button';
import { Headings } from './Headings';

export default function SubHeader() {
  return (
    <header className="sub-header">
      <div>
        <Headings type={1} title="Main Title" className="main-title" text="Verbal" />
      </div>
      <div>
        <Headings type={2} title="Main Title" className="main-title" text="10:20" />
      </div>
      <div>
        <Button
          type="button"
          title="Flag"
          className="my-button"
          text="Flag"
          onClick = {() => console.log('Submit clicked!')}
        />
        <Button
          type="button"
          title="Calculator"
          className="my-button"
          text="Calculator"
          onClick = {() => console.log('Submit clicked!')}
        />
        <Button
          type="button"
          title="References"
          className="my-button"
          text="References"
          onClick = {() => console.log('Submit clicked!')}
        />
      </div>
    </header>
  )
}
