import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import largeLogo from './assets/logo2.svg';


const style = {
  hero: {
    position: 'absolute',
    top: '50px',
    width: '50%',
    marginLeft: '40%',
  },
  heroPhone: {
    position: 'absolute',
    top: '30px',
    width: '60%',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
  },
};


export function Title({ position, children }) {
  const [width, setWidth] = React.useState(window.innerWidth);
  function updateWidth() { if (width !== window.innerWidth) setWidth(window.innerWidth); }
  let heroType;

  useEffect(() => {
    window.addEventListener('resize', updateWidth);
  }, () => window.removeEventListener('resize', updateWidth));

  if (position === 'hero') {
    heroType = width < 1100 ? 'heroPhone' : 'hero';
  }
  return (
    <div style={style[heroType]}>
      <div>
        <img src={largeLogo} alt="FineConsign logo" />
      </div>
      {children}
    </div>

  );
}


Title.propTypes = {
  position: PropTypes.oneOf(['hero', 'navbar']).isRequired,
  children: PropTypes.node,
};

Title.defaultProps = {
  children: null,
};
