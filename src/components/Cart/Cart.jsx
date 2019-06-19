import React from 'react';
import PropTypes from 'prop-types';

export function Cart({
  get,
}) {
  return (
    <>

    </>
  );
}

Cart.propTypes = {
  get: PropTypes.shape({
    orders: PropTypes.func.isRequired,
  }),
};
