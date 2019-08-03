import React, { useContext } from 'react';
import { Button, Icon, Popup } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Context } from '../../ContextProvider';

export function GoLiveButton({ id }) {
  const { edit, showConfirm } = useContext(Context);

  function handleClick() {
    showConfirm({
      title: 'Show this painting to customers!', // REQUIRED.  The title of the message requesting delete confirmation
      text: '', // The inner content of text to be displayed
      confirmAction: () => edit.painting({ isLive: true }, id), // Function called when action is confirmed
      confirmBtnColor: 'green', // String value.  Accepts color of confirmation button.
      icon: 'bullhorn', // String value or null.  Icon next to the title
      btnIcon: 'fire', // String value or null.  Icon inside the confirmation button
      btnText: 'Go Live!',
    });
  }

  return (
    <Popup
      content="Show this painting on the customer facing site"
      trigger={(
        <Button icon color="green" onClick={handleClick}>
          <Icon name="send" />
        </Button>
)}
    />
  );
}

GoLiveButton.propTypes = {
  id: PropTypes.number.isRequired,
};
