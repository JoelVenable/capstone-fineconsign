import React from 'react';
import MediaQuery from 'react-responsive';
import PropTypes from 'prop-types';

export function HiDpi({ children }) {
  return <MediaQuery minResolution="1.33333dppx">{children}</MediaQuery>;
}

export function LoDpi({ children }) {
  return <MediaQuery maxResolution="1.33332dppx">{children}</MediaQuery>;
}

export function MediaDesktop({ children }) {
  return <MediaQuery minWidth={1100}>{children}</MediaQuery>;
}

export function MediaPhone({ children }) {
  return <MediaQuery maxWidth={480}>{children}</MediaQuery>;
}

export function MediaTablet({ children }) {
  return (
    <MediaQuery minWidth={480} maxWidth={1100}>
      {children}
    </MediaQuery>
  );
}

const myPropTypes = {
  children: PropTypes.node.isRequired,
};

HiDpi.propTypes = myPropTypes;
LoDpi.propTypes = myPropTypes;
MediaDesktop.propTypes = myPropTypes;
MediaPhone.propTypes = myPropTypes;
MediaTablet.propTypes = myPropTypes;
