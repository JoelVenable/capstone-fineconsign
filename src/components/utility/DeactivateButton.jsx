

import React from 'react';
import { Popup, Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Consumer } from '../../ContextProvider';


export function DeactivateButton({ id }) {
  return (
    <Consumer>
      {({ edit, showConfirm }) => (
        <Popup
          content="Remove painting from live display"
          trigger={(
            <Button icon>
              <Icon
                name="undo"
                onClick={() => showConfirm({
                  title: 'Remove from live display?', // REQUIRED.  The title of the message requesting delete confirmation
                  text: 'Customers will no longer be able to view this painting', // The inner content of text to be displayed
                  confirmAction: () => {
                    edit.painting({ isLive: false }, id);
                  }, // Function called when action is confirmed
                  confirmBtnColor: 'blue', // String value.  Accepts color of confirmation button.
                  btnIcon: 'undo', // String value or null.  Icon inside the confirmation button
                  btnText: 'Yes', // string value.  Defaults to "yes"
                })}
              />
            </Button>
)
  }
        />
      )}
    </Consumer>
  );
}


DeactivateButton.propTypes = {
  id: PropTypes.number.isRequired,
};
