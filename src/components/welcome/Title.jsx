import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import largeLogo from './assets/logo2.svg';


export function Title({ position, children }) {
  const [width, setWidth] = React.useState(window.innerWidth);
  function updateWidth() { if (width !== window.innerWidth) setWidth(window.innerWidth); }
  let titleClassName;

  useEffect(() => {
    window.addEventListener('resize', updateWidth);
  }, () => window.removeEventListener('resize', updateWidth));

  if (position === 'hero') {
    titleClassName = 'title--hero';
  }
  return (
    <div className={titleClassName}>
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
