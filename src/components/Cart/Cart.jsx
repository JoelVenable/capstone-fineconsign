import React from 'react';
import PropTypes from 'prop-types';
import {
  Header, Table, Transition,
} from 'semantic-ui-react';
import { PaintingCartItem } from './PaintingCartItem';


export function Cart({
  myCart, history, user, paintings, removeFromCart,
}) {
  const orderedPaintings = myCart.orderItems.map(orderItem => paintings.find(item => item.id === orderItem.paintingId));
  const isDefined = !!orderedPaintings[0]; // Checks to see if data has been loaded.

  return (
    <>
      <Header as="h1" style={{ marginBottom: '2rem' }}>
    My Cart
      </Header>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Painting Name</Table.HeaderCell>
            <Table.HeaderCell>Artist</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Transition.Group animation="slide down" duration={300}>
            {isDefined ? orderedPaintings.map(painting => (
              <PaintingCartItem
                painting={painting}
                history={history}
                removeFromCart={removeFromCart}
                user={user}
                key={painting.id}
              />

            )) : null}
          </Transition.Group>
          <Table.Row>
            <Table.Cell>
              Order Total
            </Table.Cell>
            <Table.Cell />
            <Table.Cell>
              {isDefined ? `$${(
                orderedPaintings.reduce((total, painting) => total + painting.currentPrice, 0)
              )}` : null}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </>
  );
}

Cart.propTypes = {
  myCart: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  paintings: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })).isRequired,
  removeFromCart: PropTypes.func.isRequired,

};
