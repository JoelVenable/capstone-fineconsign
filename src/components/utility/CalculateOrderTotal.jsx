import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Context } from '../../ContextProvider';

export function CalculateOrderTotal({ orderId }) {
  const { orders, paintings } = useContext(Context);

  const order = orders.find(item => item.id === orderId);
  return order.orderItems.reduce(
    (acc, item) =>
      !item.isCancelled
        ? acc +
          paintings.find(painting => painting.id === item.paintingId)
            .currentPrice
        : acc,
    0
  );
}

CalculateOrderTotal.propTypes = {
  orderId: PropTypes.number.isRequired,
};
