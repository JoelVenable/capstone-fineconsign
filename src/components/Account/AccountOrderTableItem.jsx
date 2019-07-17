import React, { useContext } from 'react';
import {
  Table, Header, Popup, Label, Icon,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Context } from '../../ContextProvider';
import { OrderButton } from '../utility/OrderButton';

export function AccountOrderTableItem({ order }) {
  const { history, calculateOrderTotal } = useContext(Context);
  const orderItems = order.orderItems.reduce(
    (accumulator, item) => (item.isCancelled ? accumulator : accumulator + 1),
    0,
  );

  return (
    <Table.Row>
      <Table.Cell
        selectable
        onClick={() => history.push(`/orders/${order.id}`)}
        style={{ cursor: 'pointer' }}
      >
        <Header
          as="h4"
          image
          style={{
            minHeight: '58px',
            paddingLeft: '.5rem',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Header.Content>
            {`Order Number: ${order.id}`}
            <Header.Subheader>
              {'Submitted: '}
              {formatDate(order.submittedTime)}
            </Header.Subheader>
          </Header.Content>
        </Header>
      </Table.Cell>
      <Table.Cell>
        {!order.isCancelled && !order.isCompleted ? (
          <>
            <Popup
              content={`This order contains ${orderItems} painting${
                orderItems === 1 ? '' : 's'
              }`}
              trigger={(
                <Label color="blue">
                  <Icon name="images" />
                  {orderItems}
                </Label>
)}
            />
            <Popup
              content="The total of the order"
              trigger={(
                <Label color="green">
                  <Icon name="dollar sign" />
                  {calculateOrderTotal(order.id)}
                </Label>
)}
            />
          </>
        ) : null}

        {order.isCancelled ? (
          <Header as="h4" color="red" content="Cancelled" />
        ) : null}
        {order.isCompleted ? (
          <Header as="h4" color="blue" content="Completed" />
        ) : null}
      </Table.Cell>
      <Table.Cell>
        <OrderButton id={order.id} history={history} />
      </Table.Cell>
    </Table.Row>
  );
}

AccountOrderTableItem.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};

function formatDate(inputDate) {
  return new Date(inputDate).toLocaleString('en-US', {
    hour12: true,
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: '2-digit',
  });
}
