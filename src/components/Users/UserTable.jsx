import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';


export function UserTable({ children }) {
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>
            Name
          </Table.HeaderCell>
          <Table.HeaderCell>
            Status
          </Table.HeaderCell>
          <Table.HeaderCell>
            Actions
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {children}
      </Table.Body>
    </Table>
  );
}

UserTable.propTypes = {

  children: PropTypes.node.isRequired,
};
