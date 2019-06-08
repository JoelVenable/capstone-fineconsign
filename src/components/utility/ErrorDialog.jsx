import React from 'react';
import PropTypes from 'prop-types';

import {
  Modal, Header, Button, Icon,
} from 'semantic-ui-react';

export function ErrorDialog({
  //  Props:
  title, // REQUIRED.  The title of the message requesting delete confirmation
  text, // The inner content of text to be displayed
  hide, // REQUIRED.  The callback function that updates the "isVisible"
  isVisible, // REQUIRED. Boolean value.  Dialog will show when 'true'
  textColor, // String value.  Accepts color of all text.
}) {
  return (
    <Modal open={isVisible} onClose={hide} basic size="small">
      <Header icon="warning" color={textColor} content={title} />
      {text ? <Modal.Content><h3>{text}</h3></Modal.Content> : null}
      <Modal.Actions>
        <Button color="grey" onClick={hide}>
          <Icon name="checkmark" />
          {' '}
          Ok
        </Button>
      </Modal.Actions>
    </Modal>

  );
}

ErrorDialog.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string,
  hide: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
  textColor: PropTypes.string,
};

ErrorDialog.defaultProps = {
  text: null,
  textColor: 'orange',
};
