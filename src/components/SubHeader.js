import React, { useContext } from 'react';
import { Button } from './Button';
import { Headings } from './Headings';
import { TestInfoContext } from '../contexts/TestInfoContext';
export default function SubHeader({ testTimeStarts }) {
  const TestInfoData = useContext(TestInfoContext); 
  return (
    <header className="sub-header">
      <div>
        <Headings type={1} title="Main Title" className="main-title" text="Verbal" />
      </div>
      <div>
        <Headings type={2} title="Main Title" className="main-title" text={testTimeStarts} />
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
