import React from 'react';
import { HeroImage } from './HeroImage';
import { Title } from './Title';
import { SelectLoginRegister } from './SelectLoginRegister';
import './welcome.css';

export function Welcome() {
  return (
    <div>
      <HeroImage />
      <Title position="hero" />
      <SelectLoginRegister />
    </div>
  );
}
