import React, { useState, useContext } from 'react';
import {
  // Image,
  // Button,
  Icon,
  Table,
  Header,
  Checkbox,
  // Label,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Context } from '../../ContextProvider';

export function UserTableItem({
  user: {
    username, email, userType, isActive, id,
  },
  edit,
  //  user,
}) {
  const { showConfirm } = useContext(Context);
  const [active, setActive] = useState(isActive);
  const loggedInUser = JSON.parse(sessionStorage.getItem('userdata'));
  const image = (() => {
    if (userType === 'customer') return 'user';
    if (userType === 'employee') return 'id card';

    return 'paint brush'; // userType === 'artist'
  })();

  const toggleActive = () =>
    edit.user({ isActive: !active }, id).then(() => setActive(!active));

  return (
    <Table.Row>
      <Table.Cell>
        <Header as="h4" image>
          <Icon name={image} />
          <Header.Content>
            {username}
            <Header.Subheader>{email}</Header.Subheader>
          </Header.Content>
        </Header>
      </Table.Cell>
      <Table.Cell>
        <Checkbox
          toggle
          label={active ? 'Active User' : 'Disabled User'}
          disabled={loggedInUser.id === id}
          checked={active}
          onChange={() => {
            if (active) {
              showConfirm({
                title: 'Are you sure you want to deactivate this user?', // REQUIRED.  The title of the message requesting delete confirmation
                text: 'They will no longer be able to log in at all!', // The inner content of text to be displayed
                id, // The id to be passed to the delete function when confirmed (optional)
                confirmAction: toggleActive, // Function called when action is confirmed
                confirmBtnColor: 'orange', // String value.  Accepts color of confirmation button.
                icon: 'exclamation', // String value or null.  Icon next to the title
                btnIcon: 'cancel', // String value or null.  Icon inside the confirmation button
                btnText: 'Deactivate user', // string value.  Defaults to "yes"
              });
            } else toggleActive();
          }}
        />
      </Table.Cell>
      <Table.Cell />
    </Table.Row>
  );
}

UserTableItem.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    userType: PropTypes.string.isRequired,
    isActive: PropTypes.bool,
  }).isRequired,
  edit: PropTypes.shape({
    user: PropTypes.func.isRequired,
  }).isRequired,
};
