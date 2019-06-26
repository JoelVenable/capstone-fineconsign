import React from 'react';
import {
  Table, Header, Popup, Label, Icon,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Consumer } from '../../ContextProvider';
import { OrderButton } from '../utility/OrderButton';


export function OrderTableItem({
  order,
}) {
  return (
    <Table.Row>
      <Table.Cell>
        <Header
          as="h4"
          image
          style={{
            minHeight: '58px', paddingLeft: '.5rem', display: 'flex', flexDirection: 'row', alignItems: 'center',
          }}
        >
          <Header.Content>
            {`${order.customer.firstName} ${order.customer.lastName}`}
            <Header.Subheader>
              {'Submitted: '}
              {formatDate(order.submittedTime)}
            </Header.Subheader>
          </Header.Content>
        </Header>
      </Table.Cell>
      <Consumer>
        {({ paintings, history }) => {
          const orderTotal = order.orderItems.reduce((accumulator, item) => {
            const foundPainting = paintings.find(painting => painting.id === item.paintingId);
            return foundPainting ? foundPainting.currentPrice + accumulator : NaN;
          }, 0);
          const orderItems = order.orderItems.length;
          return (
            <>

              <Table.Cell>
                <Popup
                  content={`This order contains ${orderItems} painting${(orderItems === 1) ? '' : 's'}`}
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
                      {orderTotal}
                    </Label>
)}
                />
              </Table.Cell>
              <Table.Cell>
                <OrderButton id={order.id} history={history} />
              </Table.Cell>

            </>
          );
        }}
      </Consumer>
    </Table.Row>
  );
}

OrderTableItem.propTypes = {
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
