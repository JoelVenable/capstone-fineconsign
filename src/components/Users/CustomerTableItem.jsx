import React from 'react';
import {
  Image, Icon, Table, Header,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

export function CustomerTableItem({ customer }) {
  return (
    <Table.Row>
      <Table.Cell>
        <Header as="h4" image>
          {customer.imageUrl ? (
            <Image
              circular
              src={customer.imageUrl}
              alt={`${customer.firstName} ${customer.lastName}`}
            />
          ) : (
            <Icon name="user" />
          )}
          <Header.Content>
            {`${customer.firstName} ${customer.lastName}`}
            <Header.Subheader>
              {`${customer.city}, ${customer.state}`}
            </Header.Subheader>
          </Header.Content>
        </Header>
      </Table.Cell>
      <Table.Cell>{/* {showStatus(artist)} */}</Table.Cell>
      <Table.Cell>{/* {showControls(artist)} */}</Table.Cell>
    </Table.Row>
  );
}

CustomerTableItem.propTypes = {
  customer: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
  }).isRequired,
};
