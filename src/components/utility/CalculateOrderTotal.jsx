import React from 'react';
import PropTypes from 'prop-types';
import { Consumer } from '../../ContextProvider';

export function CalculateOrderTotal({ orderId }) {
  return (
    <Consumer>
      {({ orders, paintings }) => {
        const order = orders.find(item => item.id === orderId);
        return order.orderItems.reduce((acc, item) => (!item.isCancelled
          ? acc + paintings.find(painting => painting.id === item.paintingId).currentPrice
          : acc),
        0);
      }}
    </Consumer>
  );
}

CalculateOrderTotal.propTypes = {
  orderId: PropTypes.number.isRequired,
};
