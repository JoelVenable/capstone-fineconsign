import React from 'react';
import PropTypes from 'prop-types';
import largeLogo from './assets/logo2.svg';


export function Title({ position, children, history }) {
  const titleClassName = (position === 'hero') ? 'title--hero' : 'title--navbar';
  let handleClick = null;
  let style = {};
  if (position === 'navbar') {
    handleClick = () => history.push('/gallery');
    style = { cursor: 'pointer' };
  }

  return (
    <div className={titleClassName}>
      <div>
        <img src={largeLogo} onClick={handleClick} onKeyUp={handleClick} alt="FineConsign logo" style={style} />
      </div>
      {children}
    </div>

  );
}


Title.propTypes = {
  position: PropTypes.oneOf(['hero', 'navbar']).isRequired,
  children: PropTypes.node,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }),
};

Title.defaultProps = {
  children: null,
  history: null,
};
