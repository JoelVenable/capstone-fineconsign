import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Header, Transition } from 'semantic-ui-react';

const style = {
  mobile: {
    fontFamily: 'Euphoria Script, cursive',
    fontSize: '4rem',
    fontWeight: '400',
    textAlign: 'center',
  },
  desktop: {
    fontFamily: 'Euphoria Script, cursive',
    fontSize: '8rem',
    fontWeight: '400',
    textAlign: 'center',
  },
};


export function Title({ position, children, history }) {
  const [visible, setVisible] = useState(false);
  const titleClassName = (position === 'hero') ? 'title--hero' : 'title--navbar';
  let handleClick = null;
  if (position === 'navbar') {
    handleClick = () => history.push('/gallery');
  }

  useEffect(() => { setTimeout(() => setVisible(true), 200); }, []);

  return (
    <>
      <div className={titleClassName}>
        <div>
          <Transition visible={visible} animation="scale" duration={800}>
            <Header
              as="h1"
              style={style.desktop}
              onClick={handleClick}
              onKeyUp={handleClick}
              content="Fine Consign"
            />
          </Transition>
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
