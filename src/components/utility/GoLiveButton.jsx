import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Consumer } from '../../ContextProvider';

export function SubmitButton({ id }) {
  return (


    <Consumer>
      {({ edit, showConfirm }) => (
        <Button
          icon
          color="green"
          onClick={() =>
            showConfirm({
              title: 'Send Painting for Employee Review', // REQUIRED.  The title of the message requesting delete confirmation
              text: 'Please confirm; you cannot reverse this action.', // The inner content of text to be displayed
              confirmAction: () => edit.painting({ isSubmitted: true }, id), // Function called when action is confirmed
              confirmBtnColor: 'green', // String value.  Accepts color of confirmation button.
              icon: 'arrow circle right', // String value or null.  Icon next to the title
              btnIcon: 'send', // String value or null.  Icon inside the confirmation button
              btnText: 'Send it!',
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
