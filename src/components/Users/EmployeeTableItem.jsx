import React, { useState } from 'react';
import {
  Button, Icon, Table, Header, Form,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

export function EmployeeTableItem({
  employee, edit,
}) {
  const [priceAdjustments, setPriceAdjustments] = useState(employee.canDefinePriceAdjustments);
  const [editEmployees, setEditEmployees] = useState(employee.canEditEmployees);
  const [editInventory, setEditInventory] = useState(employee.canEditInventory);
  const [editUsers, setEditUsers] = useState(employee.canEditUsers);
  const [editOrders, setEditOrders] = useState(employee.canProcessOrders);


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
            onChange={() => setEditEmployees(!editEmployees)}
          />
          <Form.Checkbox
            label="Edit Price Adjustments"
            checked={priceAdjustments}
            onChange={() => setPriceAdjustments(!priceAdjustments)}
          />

          <Form.Checkbox
            label="Edit Inventory"
            checked={editInventory}
            onChange={() => setEditInventory(!editInventory)}
          />
          <Form.Checkbox
            label="Edit Users"
            checked={editUsers}
            onChange={() => setEditUsers(!editUsers)}
          />
          <Form.Checkbox
            label="Edit Orders"
            checked={editOrders}
            onChange={() => setEditOrders(!editOrders)}
          />
        </div>

      </Table.Cell>
      <Table.Cell>
        <Button
          icon
          onClick={() => {
            edit.employee({
              canDefinePriceAdjustments: priceAdjustments,
              canEditEmployees: editEmployees,
              canEditInventory: editInventory,
              canEditUsers: editUsers,
              canProcessOrders: editOrders,
            }, employee.id);
          }}
        >
          <Icon name="edit" />
Submit Changes
        </Button>
      </Table.Cell>
      {/* <Image className="painting--card-image" src={thumbUrl} alt={name} />
      <Card.Header className="painting--card-header">{name}</Card.Header>
      <Card.Meta className="painting--card-meta">
        {'By: '}
        {`${artist.firstName} ${artist.lastName}`}
      </Card.Meta>
      <Card.Description className="painting--card-description">
        {`Price: $${currentPrice}`}
        <Link to={`/paintings/${id}`}>
          <Button icon labelPosition="right" className="ui button">
          Details
            <Icon name="search" />
          </Button>
        </Link>
      </Card.Description> */}
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
