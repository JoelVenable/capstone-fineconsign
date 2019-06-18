import React, { useState } from 'react';
import {
  Image, Button, Icon, Table, Header, Label, Checkbox,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Consumer } from '../../ContextProvider';
import { ArtistNameLink } from '../Artists/ArtistNameLink';

export function EmployeeTableItem({
  employee, user, edit,
}) {
  console.log(employee);
  const [priceAdjustments, setPriceAdjustments] = useState(employee.canDefinePriceAdjustments);
  const [editEmployees, setEditEmployees] = useState(employee.canEditEmployees);
  const [editInventory, setEditInventory] = useState(employee.canEditInventory);
  const [editUsers, setEditUsers] = useState(employee.canEditUsers);
  const [editOrders, setEditOrders] = useState(employee.canProcessOrders);


  console.log(employee);
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
          <Checkbox
            label="Edit Price Adjustments"
            checked={priceAdjustments}
            onChange={() => setPriceAdjustments(!priceAdjustments)}
          />
          <Checkbox
            label="Edit Employees"
            color="red"
            checked={editEmployees}
            onChange={() => setEditEmployees(!editEmployees)}
          />
          <Checkbox
            label="Edit Inventory"
            checked={editInventory}
            onChange={() => setEditInventory(!editInventory)}
          />
          <Checkbox
            label="Edit Users"
            checked={editUsers}
            onChange={() => setEditUsers(!editUsers)}
          />
          <Checkbox
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

function showControls(artist) {
  //  Under normal circumstances, this final return
  //  statement should never be reached...


  return null;
}

function showStatus({ paintings }) {
  const pending = paintings.filter(painting => painting.isSubmitted && !painting.isLive && !painting.isSold).length;
  const active = paintings.filter(painting => painting.isLive && !painting.isSold).length;
  const sold = paintings.filter(painting => painting.isSold).length;

  return (
    <>
      <Label color="orange">
        <Icon name="pause" />
        {pending}
      </Label>
      <Label color="blue">
        <Icon name="bolt" />
        {active}
      </Label>
      <Label color="green">
        <Icon name="dollar sign" />
        {sold}
      </Label>
    </>
  );
}

EmployeeTableItem.propTypes = {
  employee: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
  }),
  // history: PropTypes.shape({
  //   push: PropTypes.func.isRequired,
  // }).isRequired,
  // painting: PropTypes.shape({
  //   artist: PropTypes.shape({
  //     firstName: PropTypes.string.isRequired,
  //     lastName: PropTypes.string.isRequired,
  //   }).isRequired,
  //   //   artistId: PropTypes.number.isRequired,
  //   // currentPrice: PropTypes.number.isRequired,
  //   // forSaleDate: PropTypes.string.isRequired,
  //   id: PropTypes.number.isRequired,
  //   // imgUrl: PropTypes.string.isRequired,
  //   // liveDescription: PropTypes.string.isRequired,
  //   name: PropTypes.string.isRequired,
  //   originalPrice: PropTypes.number.isRequired,
  //   priceAdjustmentId: PropTypes.number.isRequired,
  //   submittedDescription: PropTypes.string.isRequired,
  //   thumbUrl: PropTypes.string.isRequired,
  // }).isRequired,
  user: PropTypes.shape({
    userType: PropTypes.string.isRequired,
  }).isRequired,
};


// function EditButton({ id }) {
//   return (
//     <Button icon>
//       <Icon name="edit" onClick={() => history.push(`/paintings/${id}/edit`)} />
//     </Button>
//   );
// }


// EditButton.propTypes = {
//   id: PropTypes.number.isRequired,
//   history: PropTypes.shape({
//     push: PropTypes.func.isRequired,
//   }).isRequired,
//   update: PropTypes.shape({
//     employee: PropTypes.func.isRequired,
//   }).isRequired,
// };
