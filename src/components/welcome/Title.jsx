import React from 'react';
import PropTypes from 'prop-types';
import largeLogo from './assets/logo2.svg';


export function Title({ position, children }) {
  const titleClassName = (position === 'hero') ? 'title--hero' : 'title--navbar';

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
