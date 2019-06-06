import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

export function ProtectedRoute({ render, isAuthorized, ...rest }) {
  const incomingRender = render;
  return (
    <Route
      {...rest}
      render={props =>
        (isAuthorized ? incomingRender(props) : <Redirect to="/" />)
      }
    />
  );
}

ProtectedRoute.propTypes = {
  render: PropTypes.func.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
};
