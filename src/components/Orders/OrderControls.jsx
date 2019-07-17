import React from 'react';
import PropTypes from 'prop-types';
import { Button, Header } from 'semantic-ui-react';

export function OrderControls({
  order,
  showControls,
  handleApprove,
  showCancelOrderModal,
}) {
  return showControls ? (
    <div>
      <Button
        negative
        style={{ marginRight: '1rem' }}
        onClick={showCancelOrderModal}
        content="Cancel Order"
      />
      <Button content="Approve Order" primary onClick={handleApprove} />
    </div>
  ) : (
    <div>
      {order.isCancelled ? (
        <Header as="h3" color="red" content="Order Cancelled" />
      ) : null}
      {order.isCompleted ? (
        <Header as="h3" color="blue" content="Order Completed" />
      ) : null}
    </div>
  );
}

OrderControls.propTypes = {
  order: PropTypes.shape({
    isCancelled: PropTypes.bool.isRequired,
    isCompleted: PropTypes.bool.isRequired,
  }).isRequired,
  showControls: PropTypes.bool.isRequired,
  handleApprove: PropTypes.func.isRequired,
  showCancelOrderModal: PropTypes.func.isRequired,
};
