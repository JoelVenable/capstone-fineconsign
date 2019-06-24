import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Consumer } from '../../ContextProvider';

export function GoLiveButton({ id }) {
  return (


    <Consumer>
      {({ edit, showConfirm }) => (
        <Button
          icon
          color="green"
          onClick={() =>
            showConfirm({
              title: 'Show this painting to customers!', // REQUIRED.  The title of the message requesting delete confirmation
              text: '', // The inner content of text to be displayed
              confirmAction: () => edit.painting({ isLive: true }, id), // Function called when action is confirmed
              confirmBtnColor: 'green', // String value.  Accepts color of confirmation button.
              icon: 'bullhorn', // String value or null.  Icon next to the title
              btnIcon: 'fire', // String value or null.  Icon inside the confirmation button
              btnText: 'Go Live!',
            })}
        >
          <Icon name="send" />
        </Button>
      )}
    </Consumer>
  );
}

GoLiveButton.propTypes = {
  id: PropTypes.number.isRequired,
};
