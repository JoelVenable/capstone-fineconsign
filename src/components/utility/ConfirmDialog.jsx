import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal, Header, Button, Icon,
} from 'semantic-ui-react';

export function ConfirmDialog({
  //  Props:
  title, // REQUIRED.  The title of the message requesting delete confirmation
  text, // The inner content of text to be displayed
  id, // The id to be passed to the delete function when confirmed (optional)
  hide, // REQUIRED.  The callback function that updates the "isModalVisible"
  isVisible, // REQUIRED. Boolean value.  Dialog will show when 'true'
  confirmAction, // Function called when action is confirmed
  confirmBtnColor, // String value.  Accepts color of confirmation button.
  icon, // String value or null.  Icon next to the title
  btnIcon, // String value or null.  Icon inside the confirmation button
}) {
  const handleAction = () => {
    if (id) confirmAction(id);
    else confirmAction();
    hide();
  };

  return (
    <Modal open={isVisible} onClose={hide}>
      <Header icon={icon} content={title} />
      {text ? <Modal.Content><h4>{text}</h4></Modal.Content> : null}
      <Modal.Actions>
        <Button color="grey" onClick={hide}>
          <Icon name="user cancel" />
          {' No'}
        </Button>
        <Button color={confirmBtnColor} onClick={handleAction}>
          <Icon name={btnIcon} />
          {' Yes'}
        </Button>
      </Modal.Actions>
    </Modal>


  );
}

ConfirmDialog.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string,
  id: PropTypes.number,
  hide: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
  confirmAction: PropTypes.func.isRequired,
  confirmBtnColor: PropTypes.string.isRequired,
  icon: PropTypes.string,
  btnIcon: PropTypes.string,
};

ConfirmDialog.defaultProps = {
  text: null,
  id: NaN,
  icon: null,
  btnIcon: 'check',
};
