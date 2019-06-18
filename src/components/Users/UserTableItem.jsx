import React, { useState } from 'react';
import {
  Image,
  Button,
  Icon,
  Table,
  Header,
  Checkbox,
  // Label,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

export function UserTableItem({
  user: {
    username,
    email,
    userType,
    isActive,

  },
  //  user,
}) {
  const [active, setActive] = useState(isActive);
  const image = (() => {
    if (userType === 'customer') return 'user';
    if (userType === 'employee') return 'id card';
    if (userType === 'artist') return 'paint brush';
  })();

  return (
    <Table.Row>

      <Table.Cell>
        <Header as="h4" image>
          <Icon name={image} />
          <Header.Content>
            {username}
            <Header.Subheader>
              {email}
            </Header.Subheader>
          </Header.Content>
        </Header>
      </Table.Cell>
      <Table.Cell>
        <Checkbox toggle label="Enabled" />
      </Table.Cell>
      <Table.Cell>

      </Table.Cell>

    </Table.Row>
  );
}


UserTableItem.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    userType: PropTypes.string.isRequired,

  }).isRequired,
};
