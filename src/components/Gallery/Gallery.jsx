import React from 'react';
import { Button } from 'semantic-ui-react';
import { Navbar } from '../Navbar';


export function Gallery() {
  return (
    <>
      <Navbar />
      <div>Hello from Gallery!</div>
      <Button primary>Click Here</Button>
    </>
  );
}
