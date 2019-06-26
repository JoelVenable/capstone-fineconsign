import React, { useState } from 'react';
import {
  Modal, Form, Message, Button, Icon, Segment, Header,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';


export function DeleteOrderItemModal({
  isModalVisible, handleClose, edit, updateAll, orderItemId,
}) {
  const [message, setMessage] = useState('');
  const [modalDisabled, setModalDisabled] = useState(false);
  const [successHidden, setSuccessHidden] = useState(true);
  const handleCancelItem = (e) => {
    e.preventDefault();
    setModalDisabled(true);
    edit.orderItem({
      isCancelled: true,
      cancelMessage: message,
    }, orderItemId)
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
        <Header>
          <Header.Content>
          Do you want to reject this order item?
            <Header.Subheader>

            </Header.Subheader>
          </Header.Content>
        </Header>
        <Form>
          <Form.Field
            disabled={modalDisabled}
            control="textarea"
            label="Please explain to the customer why this order item was cancelled:"
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
              {' Yes, cancel this item'}
            </Button>
          </Form.Group>

        </Form>
      </Segment>
    </Modal>
  );
}


DeleteOrderItemModal.propTypes = {
  isModalVisible: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  edit: PropTypes.shape({
    orderItem: PropTypes.func.isRequired,
  }).isRequired,
  updateAll: PropTypes.func.isRequired,
  orderItemId: PropTypes.number.isRequired,

};
