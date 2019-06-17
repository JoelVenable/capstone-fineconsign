import React from 'react';
import { Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Consumer } from '../../ContextProvider';

export function DeleteButton({ id, type }) {
  return (
    <Consumer>
      {({ showConfirm, remove }) => (
        <Button
          color="red"
          width="4"
          onClick={(e) => {
            e.preventDefault();
            showConfirm({
              title: `Are you sure you want to delete this ${type}?`, // REQUIRED.  The title of the message requesting delete confirmation
              text: 'This action cannot be reversed!', // The inner content of text to be displayed
              id, // The id to be passed to the delete function when confirmed (optional)
              confirmAction: () => remove[type](id), // Function called when action is confirmed
              confirmBtnColor: 'red', // String value.  Accepts color of confirmation button.
              icon: 'exclamation', // String value or null.  Icon next to the title
              btnIcon: 'trash alternate', // String value or null.  Icon inside the confirmation button
              btnText: 'Yes, delete', // string value.  Defaults to "yes"
            });
          }}
          content="Delete draft"
        />
      )}
    </Consumer>
  );
}

DeleteButton.propTypes = {
  id: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['artist', 'painting', 'customer', 'employee']).isRequired,
};
