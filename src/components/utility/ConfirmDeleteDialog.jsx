import React from 'react';
import PropTypes from 'prop-types';
import {
  DialogContent,
  DialogContentText,
  DialogActions,
  Dialog,
  DialogTitle,
  Button,
} from '@material-ui/core';

export function ConfirmDialog({
  //  Props:
  title, // REQUIRED.  The title of the message requesting delete confirmation
  text, // The inner content of text to be displayed
  id, // The id to be passed to the delete function when confirmed (optional)
  hideModal, // REQUIRED.  The callback function that updates the "isModalVisible"
  isModalVisible, // REQUIRED. Boolean value.  Dialog will show when 'true'
  confirmAction, // Function called when action is confirmed
  confirmBtnColor, // String value.  Accepts color of confirmation button.
}) {
  const handleAction = () => {
    if (id) confirmAction(id);
    else confirmAction();
    hideModal();
  };

  return (
    <Dialog
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={isModalVisible}
      onClose={hideModal}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button className="" variant="contained" onClick={hideModal}>
          NO
        </Button>
        <Button
          style={{ backgroundColor: confirmBtnColor, color: 'white' }}
          variant="contained"
          onClick={handleAction}
        >
          YES
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmDialog.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string,
  id: PropTypes.number,
  hideModal: PropTypes.func.isRequired,
  isModalVisible: PropTypes.bool.isRequired,
  confirmAction: PropTypes.func.isRequired,
  confirmBtnColor: PropTypes.string.isRequired,
};

ConfirmDialog.defaultProps = {
  text: null,
  id: NaN,
};
