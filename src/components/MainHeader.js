import React from 'react'
import { Button } from './Button';
import { Headings } from './Headings';

export const MainHeader = () => {
  return (
    <header className="header">
      <div>
        <Headings type={1} title="Main Title" className="main-title" text="Welcome to My Site" />
      </div>
      <div>
        <Button
          type="button"
          title="Dashboard"
          className="my-button"
          text="Dashboard"
          onClick = {() => console.log('Submit clicked!')}
        />
      </div>
    </header>
  )
}
