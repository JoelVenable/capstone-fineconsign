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

export function ErrorDialog({
  //  Props:
  title, // REQUIRED.  The title of the message requesting delete confirmation
  text, // The inner content of text to be displayed
  hide, // REQUIRED.  The callback function that updates the "isVisible"
  isVisible, // REQUIRED. Boolean value.  Dialog will show when 'true'
  textColor, // String value.  Accepts color of all text.
}) {
  return (
    <Dialog
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={isVisible}
      onClose={hide}
    >
      <DialogTitle style={{ color: textColor }}>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText style={{ color: textColor }}>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button className="" variant="contained" onClick={hide}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
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
  textColor: '#000',
};
