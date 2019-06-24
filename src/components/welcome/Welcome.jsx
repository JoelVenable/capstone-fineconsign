import React from 'react';
import { HeroImage } from './HeroImage';
import { Title } from './Title';
import './welcome.css';
import { GalleryButton } from './GalleryButton';

export function Welcome() {
  return (
    <div>
      <HeroImage />
      <Title position="hero" />
      <GalleryButton />
    </div>
  );
}
