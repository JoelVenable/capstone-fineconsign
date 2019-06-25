import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Header, Table, Transition, Button, Icon, Loader, Segment, Dimmer, Card, Responsive,
} from 'semantic-ui-react';
import { PaintingOrderItem } from './PaintingOrderItem';
import { Consumer } from '../../ContextProvider';


export function OrderDetail({ id }) {
  console.log(id);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);


  return (
    <Consumer>
      {({
        orders, paintings, history, removeFromCart, user, edit,
      }) => {
        console.log('orders', orders);
        const order = orders.find(item => item.id === id);
        console.log('found order', order);
        const orderedPaintings = order ? order.orderItems.map(orderItem => paintings.find(item => item.id === orderItem.paintingId)) : null;
        // The 'isDefined' variable checks to see if data has been loaded.
        // Otherwise the page will break as it will try to access properties of an undefined object
        // (happens on initial paint before the fetch call resolves)
        const isDefined = order ? !!orderedPaintings[0] : false;
        return (
          <>
            {isDefined ? (
              <>

                <Header as="h1" style={{ marginBottom: '2rem' }}>
Order number:
                  {' '}
                  {id}
                </Header>
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

                        <Table.HeaderCell>
                          <Responsive minWidth={767}>Painting Name</Responsive>
                          <Responsive maxWidth={766}>Items:</Responsive>
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                          <Responsive minWidth={767}>Artist</Responsive>
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                          <Responsive minWidth={767}>Price</Responsive>
                        </Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      <Transition.Group animation="slide down" duration={300}>
                        {isDefined ? orderedPaintings.map(painting => (
                          <PaintingOrderItem
                            painting={painting}
                            history={history}
                            removeFromCart={removeFromCart}
                            user={user}
                            key={painting.id}
                          />
                        )) : null}

                      </Transition.Group>
                    </Table.Body>
                  </Table>


                </Segment>

              </>
            ) : null}
          </>
        );
      }}
    </Consumer>
  );
}

OrderDetail.propTypes = {
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


//         {(orderedPaintings.length > 0) ? (


//                   )) : null}
//                 </Transition.Group>
//                 <Table.Row>
//                   <Table.Cell>
//                     <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
//                       {'Order Total:'}
//                       <Responsive maxWidth={766}>
//                         {isDefined ? `$${(
//                           orderedPaintings.reduce((total, painting) => total + painting.currentPrice, 0)
//                         )}` : null}
//                       </Responsive>
//                     </div>

//                   </Table.Cell>
//                   <Table.Cell>
//                     <Button
//                       icon
//                       primary
//                       fluid
//                       onClick={() => {
//                         setLoading(true);
//                         edit.order({
//                           isSubmitted: true,
//                           submittedTime: new Date(),

//                         }, order.id).then(() => {
//                           orderedPaintings.forEach((painting) => {
//                             edit.painting({ isPendingSale: true }, painting.id);
//                           });
//                         });

//                         setTimeout(() => {
//                           setSuccess(true);
//                           setLoading(false);
//                         }, 1000);
//                       }}
//                     >
//                       <Icon name="dollar sign" />
// Buy Now
//                     </Button>
//                   </Table.Cell>
//                   <Table.Cell>
//                     <Responsive minWidth={767}>
//                       {isDefined ? `$${(
//                         orderedPaintings.reduce((total, painting) => total + painting.currentPrice, 0)
//                       )}` : null}
//                     </Responsive>
//                   </Table.Cell>
//                 </Table.Row>
//               </Table.Body>
//             </Table>

//           </Segment>
//         ) : (
//           <div style={{ display: 'flex', justifyContent: 'center' }}>
//             <Card>
//               <Card.Content>
//                 <Card.Header>
//                   <Icon name="frown outline" color="orange" size="big" />
// Your cart is empty...
//                 </Card.Header>
//               </Card.Content>
//             </Card>
//           </div>
//         )}
