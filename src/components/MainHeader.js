import React from 'react'
import { Button } from './Button';
import { Headings } from './Headings';

export const MainHeader = () => {
  return (
    <header>
      <div>
        <Headings type={1} title="Main Title" className="main-title" text="Welcome to My Site" />
      </div>
      <div>
        <Button
          type="button"
          title="Click me!"
          className="my-button"
          text="Click Me"
          onClick = {() => console.log('Submit clicked!')}
        />
      </div>
    </header>
  )
}
