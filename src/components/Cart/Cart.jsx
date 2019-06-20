import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Header, Table, Transition, Button, Icon, Loader, Segment, Dimmer, Card,
} from 'semantic-ui-react';
import { PaintingCartItem } from './PaintingCartItem';


export function Cart({
  myCart, history, user, paintings, removeFromCart, edit,
}) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const orderedPaintings = myCart.orderItems.map(orderItem => paintings.find(item => item.id === orderItem.paintingId));
  const isDefined = !!orderedPaintings[0]; // Checks to see if data has been loaded.

  return (
    <>
      <Header as="h1" style={{ marginBottom: '2rem' }}>
    My Cart
      </Header>
      {(orderedPaintings.length > 0) ? (
        <Segment>
          <Dimmer active={loading}>
            <Loader>
Submitting...
            </Loader>
          </Dimmer>

          <Dimmer active={success}>
            <Card>

              <Card.Content>
                <Card.Header>Your order has been processed!</Card.Header>
                <Card.Description>
      We will be in touch soon.
                </Card.Description>


              </Card.Content>

            </Card>

          </Dimmer>

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
                <Table.Cell>
                  <Button
                    icon
                    primary
                    fluid
                    onClick={() => {
                      setLoading(true);
                      edit.order({
                        isSubmitted: true,
                        submittedTime: new Date(),

                      }, myCart.id).then(() => {
                        orderedPaintings.forEach((painting) => {
                          edit.painting({ isPendingSale: true }, painting.id);
                        });
                      });

                      setTimeout(() => {
                        setSuccess(true);
                        setLoading(false);
                      }, 1000);
                    }}
                  >
                    <Icon name="dollar sign" />
Buy Now
                  </Button>
                </Table.Cell>
                <Table.Cell>
                  {isDefined ? `$${(
                    orderedPaintings.reduce((total, painting) => total + painting.currentPrice, 0)
                  )}` : null}
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>

        </Segment>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Card>
            <Card.Content>
              <Card.Header>
                <Icon name="frown outline" color="orange" size="big" />
Your cart is empty...
              </Card.Header>
            </Card.Content>
          </Card>
        </div>
      )}
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
