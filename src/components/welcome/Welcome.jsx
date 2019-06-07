import React, { Component } from 'react';
import { HeroImage } from './HeroImage';
import { Title } from './Title';
import { SelectLoginRegister } from './SelectLoginRegister';

export class Welcome extends Component {
  render() {
    return (
      <div>
        <HeroImage />
        <Title position="hero">

          <SelectLoginRegister />
        </Title>
      </div>
    );
  }
}
