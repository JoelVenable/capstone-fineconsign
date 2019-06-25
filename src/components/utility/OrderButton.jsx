import React from 'react';
import { Button, Icon, Popup } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export function OrderButton({ id, history }) {
  return (
    <Popup
      content="Go to order detail"
      trigger={(
        <Button icon color="blue">
          <Icon name="box" onClick={() => history.push(`/orders/${id}`)} />
        </Button>
)}
    />
  );
}


OrderButton.propTypes = {
  id: PropTypes.number.isRequired, // Expects the ORDER ID!!!
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
