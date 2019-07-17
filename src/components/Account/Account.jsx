import React, { useContext } from 'react';
import { Segment, Header, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Context } from '../../ContextProvider';
import { AccountOrderTableItem } from './AccountOrderTableItem';

export function Account() {
  const { orders, user } = useContext(Context);
  let data = {};
  if (user) {
    if (user.userType === 'artist') {
      data = user.artist;
    }
    if (user.userType === 'customer') {
      data = user.customer;
    }
  }

  return user ? (
    <Segment.Group>
      <Segment>
        <Header content="Account Details" />
      </Segment>
      <Segment>
        <Table columns={2} style={{ width: '50%' }}>
          <Table.Body>
            <AccountRow header="Username:" content={user.username} />
            <AccountRow header="Email:" content={user.email} />
            <AccountRow
              header="Address:"
              content={(
                <>
                  <p>{data.address}</p>
                  <p>{`${data.city}, ${data.state} ${data.zipcode}`}</p>
                </>
)}
            />
            <AccountRow
              header="Account Balance: "
              content={`$${data.accountBalance}`}
            />
          </Table.Body>
        </Table>
      </Segment>
      {user.userType === 'customer' ? (
        <>
          <Segment>
            <Header content="My Orders" />
          </Segment>
          <Segment>
            <Table>
              <Table.Body>
                {orders ? (
                  orders
                    .filter(
                      ({ customerId, isSubmitted }) =>
                        customerId === data.id && isSubmitted,
                    )
                    .map(order => (
                      <AccountOrderTableItem order={order} key={order.id} />
                    ))
                ) : (
                  <> </>
                )}
              </Table.Body>
            </Table>
          </Segment>
        </>
      ) : null}
    </Segment.Group>
  ) : (
    <Segment.Group>
      <Segment>
        <Header content="No User found" />
      </Segment>
    </Segment.Group>
  );
}

function AccountRow({ header, content }) {
  return (
    <Table.Row>
      <Table.Cell width={4}>{header}</Table.Cell>
      <Table.Cell width={6}>{content}</Table.Cell>
    </Table.Row>
  );
}

AccountRow.propTypes = {
  header: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
};
