import { Picture } from 'react-responsive-picture';
import React from 'react';

const baseUrl = './assets/hero-';

export function Hero() {
  return (
    <Picture
      sources={[
        {
          srcSet: `${baseUrl}mobile-small.jpg, ${baseUrl}-mobile-retina.jpg 2x`,
        },
        {
          srcSet: `${baseUrl}1024.jpg, retina.jpg 2x`,
          media: '(min-width: 760)',
        },
        {
          srcSet: `${baseUrl}1080p.jpg, ${baseUrl}4k.jpg 2x`,
          media: '(min-width: 1200)',
        },
      ]}
    />
  );
}
