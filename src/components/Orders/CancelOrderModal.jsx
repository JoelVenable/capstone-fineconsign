import React, { useState } from 'react';
import {
  Modal, Form, Message, Button, Icon, Segment, Header,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';


export function CancelOrderModal({
  isModalVisible, handleClose, edit, updateAll, order, orderedPaintings,
}) {
  const [message, setMessage] = useState('');
  const [modalDisabled, setModalDisabled] = useState(false);
  const [successHidden, setSuccessHidden] = useState(true);
  const handleCancelItem = (e) => {
    e.preventDefault();
    setModalDisabled(true);
    edit.order({
      isCancelled: true,
      cancelMessage: message,
      cancelledTime: new Date(),
    }, order.id)
      .then(() => orderedPaintings.forEach((painting) => {
        edit.painting({ isPendingSale: false, isLive: true }, painting.id);
      }))
      .then(updateAll)
      .then(() => {
        setTimeout(() => {
          setSuccessHidden(false);
        }, 300);
        setTimeout(handleClose, 800);
      });
  };


  const handleFieldChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <Modal
      open={isModalVisible}
      onClose={handleClose}
    >
      <Segment>
        <Header
          content="Do you want to cancel this customer order?"
          subheader="Note that paintings will be automatically made available for sale again."
        />
        <Form>
          <Form.Field
            disabled={modalDisabled}
            control="textarea"
            label="Please explain to the customer why this order was cancelled:"
            value={message}
            onChange={handleFieldChange}
          />
          <Message success header="Order item cancelled!" hidden={successHidden} />
          <Form.Group style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
          >
            <Button icon onClick={handleClose}>
              <Icon name="undo" />
              {' Go back'}
            </Button>
            <Button type="submit" icon onClick={handleCancelItem} color="orange" loading={modalDisabled}>
              <Icon name="trash" />
              {' Yes, cancel this Order'}
            </Button>
          </Form.Group>

        </Form>
      </Segment>
    </Modal>
  );
}


CancelOrderModal.propTypes = {
  isModalVisible: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  edit: PropTypes.shape({
    order: PropTypes.func.isRequired,
  }).isRequired,
  updateAll: PropTypes.func.isRequired,
  order: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  orderedPaintings: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })).isRequired,
};
