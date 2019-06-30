import React, { useState } from 'react';
import {
  Table, Header, Form,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { SubmitButton } from '../utility/SubmitButton';

export function EmployeeTableItem({
  employee, edit,
}) {
  const [editEmployees, setEditEmployees] = useState(employee.canEditEmployees);
  const [editInventory, setEditInventory] = useState(employee.canEditInventory);
  const [editUsers, setEditUsers] = useState(employee.canEditUsers);
  const [editOrders, setEditOrders] = useState(employee.canProcessOrders);
  const [disabled, setDisabled] = useState(true);


  return (
    <Table.Row>

      <Table.Cell>
        <Header>
          <Header.Content>{employee.user.username}</Header.Content>
          <Header.Subheader>{employee.user.email}</Header.Subheader>
        </Header>
      </Table.Cell>
      <Table.Cell>
        <div style={{
          display: 'flex',
          flexDirection: 'column',

        }}
        >
          <Form.Checkbox
            label="Administrator"
            checked={editEmployees}
            onChange={() => {
              setDisabled(false);
              setEditEmployees(!editEmployees);
            }}
          />


          <Form.Checkbox
            label="Edit Inventory"
            checked={editInventory}
            onChange={() => {
              setDisabled(false);
              setEditInventory(!editInventory);
            }}
          />
          <Form.Checkbox
            label="Edit Users"
            checked={editUsers}
            onChange={() => {
              setDisabled(false);
              setEditUsers(!editUsers);
            }}
          />
          <Form.Checkbox
            label="Edit Orders"
            checked={editOrders}
            onChange={() => {
              setDisabled(false);
              setEditOrders(!editOrders);
            }}
          />
        </div>

      </Table.Cell>
      <Table.Cell>
        <SubmitButton
          initialIcon="edit"
          disabled={disabled}
          buttonText="Submit Changes"
          submitActionThatReturnsPromise={() => {
            setDisabled(true);
            return edit.employee({
              canEditEmployees: editEmployees,
              canEditInventory: editInventory,
              canEditUsers: editUsers,
              canProcessOrders: editOrders,
            }, employee.id);
          }}
        />

      </Table.Cell>

    </Table.Row>
  );
}

EmployeeTableItem.propTypes = {
  employee: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  edit: PropTypes.shape({
    employee: PropTypes.func.isRequired,
  }).isRequired,
};
