import React from 'react';
import PropTypes from 'prop-types';
import { Header } from 'semantic-ui-react';


export function Title({ position, children, history }) {
  const titleClassName = (position === 'hero') ? 'title--hero' : 'title--navbar';
  let handleClick = null;
  if (position === 'navbar') {
    handleClick = () => history.push('/gallery');
  }

  return (
    <>
      <div className={titleClassName}>
        <div>
          <Header
            as="h1"
            style={{
              fontFamily: 'Euphoria Script, cursive',
              fontSize: '4rem',
              fontWeight: '400',
              textAlign: 'center',
              '@media (minWidth: 480px)': {
                fontSize: '6rem',
              },
            }}
            onClick={handleClick}
            onKeyUp={handleClick}
            content="Fine Consign"
          />
        </div>
        {children}
      </div>
    </>

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
