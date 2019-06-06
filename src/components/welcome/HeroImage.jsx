
import React from 'react';
import Image from '../utility/Image';
import heroDesktopHi from './assets/hero-4k.jpg';
import heroDesktopLo from './assets/hero-1080p.jpg';
import heroTabletHi from './assets/hero-retina.jpg';
import heroTabletLo from './assets/hero-1024.jpg';
import heroMobileHi from './assets/hero-mobile-retina.jpg';
import heroMobileLo from './assets/hero-mobile-small.jpg';
import {
  HiDpi,
  LoDpi,
  MediaTablet,
  MediaDesktop,
  MediaPhone,
} from '../utility/media';


const options = {
  disableSpinner: true,
  altText: 'Artist paintbrushes in a mason jar',
  imageStyle: {
    width: '100%',
    height: '100vh',
    objectFit: 'cover',
    objectPosition: '50% 0',
  },
};
export function HeroImage() {
  return (
    <>
      <MediaPhone>
        <HiDpi>
          <Image src={heroMobileHi} {...options} />
        </HiDpi>
        <LoDpi>
          <Image src={heroMobileLo} {...options} />
        </LoDpi>
      </MediaPhone>
      <MediaTablet>
        <HiDpi>
          <Image src={heroTabletHi} {...options} />
        </HiDpi>
        <LoDpi>
          <Image src={heroTabletLo} {...options} />
        </LoDpi>
      </MediaTablet>
      <MediaDesktop>
        <HiDpi>
          <Image src={heroDesktopHi} {...options} />
        </HiDpi>
        <LoDpi>
          <Image src={heroDesktopLo} {...options} />
        </LoDpi>
      </MediaDesktop>
    </>
  );
}
