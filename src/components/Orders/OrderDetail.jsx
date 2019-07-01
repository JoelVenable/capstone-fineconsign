import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Header, Table, Transition, Loader, Segment, Dimmer, Card, Responsive, Item, Grid, Button,
} from 'semantic-ui-react';
import { PaintingOrderItem } from './PaintingOrderItem';
import { Consumer } from '../../ContextProvider';
import { CancelOrderModal } from './CancelOrderModal';

export function OrderDetail({ id }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  function handleClose() {
    setIsModalVisible(false);
  }

  return (
    <Consumer>
      {({
        orders, paintings, history, user, edit, updateAll, calculateOrderTotal, completeOrder,
      }) => {
        const order = orders.find(item => item.id === id);
        const userType = user ? user.userType : null;

        const customer = order ? order.customer : { id: null };
        let authorized = false;
        let showControls = order ? !order.isCancelled && !order.isCompleted : false;
        const orderedPaintings = order ? (
          order.orderItems.map((orderItem) => {
            const painting = paintings.find(item => item.id === orderItem.paintingId);
            painting.orderItem = orderItem;
            return painting;
          })
        ) : null;


        // The 'isDefined' variable checks to see if data has been loaded.
        // Otherwise the page will break as it will try to access properties of an undefined object
        // (happens on initial paint before the fetch call resolves)
        const isDefined = order ? !!orderedPaintings[0] : false;
        const isCancelled = order ? order.isCancelled : false;

        //  Check if user is authorized to view this order
        if (userType === 'customer') {
          showControls = false;
          // checks the order's customer id against the logged in user's customer id.
          if (customer.id === user.customer.id) authorized = true;
        }
        if (userType === 'employee') {
          if (user.employee.canProcessOrders) authorized = true;
        }

        console.log(isCancelled);
        return (isDefined && authorized) ? (
          <Segment.Group>
            <CancelOrderModal
              isModalVisible={isModalVisible}
              handleClose={handleClose}
              edit={edit}
              updateAll={updateAll}
              orderedPaintings={orderedPaintings}
              order={order}
            />
            <Dimmer active={loading}>
              <Loader content="Submitting..." />
            </Dimmer>
            <Dimmer active={success}>
              <Card content={
                <Header content="This order has been processed!" />}
              />
            </Dimmer>
            <Segment
              disabled={loading}
            >

              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Header
                  as="h1"
                  style={{ marginBottom: '2rem' }}
                  content={`Order number: ${id}`}
                />
                {showControls ? (
                  <div>
                    <Button
                      negative
                      style={{ marginRight: '1rem' }}
                      onClick={() => setIsModalVisible(true)}
                      content="Cancel Order"
                    />
                    <Button
                      content="Approve Order"
                      primary
                      onClick={() => {
                        setLoading(true);
                        completeOrder(id);
                        setTimeout(() => {
                          setSuccess(true);
                          setLoading(false);
                        });
                      }}
                    />


                  </div>
                ) : (
                  <div>
                    {order.isCancelled ? (
                      <Header as="h3" color="red" content="Order Cancelled" />
                    ) : null}
                    {order.isCompleted ? (
                      <Header as="h3" color="blue" content="Order Completed" />
                    ) : null}
                  </div>
                )}
              </div>
            </Segment>
            {isCancelled ? (
              <Segment>
                <Grid columns={2}>
                  <Grid.Row>
                    <Grid.Column>
                      <Header content="Reason for cancellation:" />
                    </Grid.Column>
                    <Grid.Column>
                      {order.cancelMessage}
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
            ) : null}
            <Segment
              disabled={loading || order.isCancelled}
            >
              {customer ? (
                <Grid columns={2}>
                  <Grid.Row>
                    <Grid.Column>
                      <Header as="h3">Customer Data:</Header>
                      <p style={{ marginTop: '2rem' }}>
                        {`Account Balance: $${customer.accountBalance}`}
                      </p>
                    </Grid.Column>
                    <Grid.Column>
                      <Item>
                        <Item.Header as="h5">
                          {`${customer.firstName} ${customer.lastName}`}
                        </Item.Header>
                        <Item.Meta>
                          {customer.address}
                        </Item.Meta>
                        <Item.Meta>
                          {`${customer.city}, ${customer.state} ${customer.zipcode}`}
                        </Item.Meta>

                      </Item>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              ) : null}
            </Segment>
            <Segment
              disabled={loading || order.isCancelled}
            >
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
                        edit={edit}
                        showControls={showControls}
                        updateAll={updateAll}
                        user={user}
                        key={painting.id}
                      />
                    )) : null}

                  </Transition.Group>
                </Table.Body>
                <Table.Footer>
                  <Table.Row>
                    <Table.HeaderCell colSpan="3">
                      <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        fontWeight: 'bold',
                      }}
                      >
                        <span>
                          {'Order Total: '}
                        </span>
                        <div>
                          {`$${calculateOrderTotal(id)}`}
                        </div>
                      </div>

                    </Table.HeaderCell>
                  </Table.Row>

                </Table.Footer>
              </Table>
            </Segment>
          </Segment.Group>
        ) : <></>;
      }}
    </Consumer>
  );
}

OrderDetail.propTypes = {
  id: PropTypes.number.isRequired,
};
