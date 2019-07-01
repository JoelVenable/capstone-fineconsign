import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import { OrderTableItem } from './OrderTableItem';

export function OrderTable({ ordersList }) {
  return (
    <>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
            Order
            </Table.HeaderCell>
            <Table.HeaderCell>
            Status
            </Table.HeaderCell>
            <Table.HeaderCell>
            Actions
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {renderTableItems(ordersList)}
        </Table.Body>
      </Table>
    </>
  );
}

OrderTable.propTypes = {
  ordersList: PropTypes.arrayOf(PropTypes.object).isRequired,
};


function renderTableItems(items) {
//   let newItems = (user.userType === 'artist')
//     ? items.filter(item => item.artistId === user.artist.id)
//     : null;

  //   if (user.userType === 'employee') {
  //     newItems = items.filter((item) => {
  //       if (!item.isSubmitted && !item.isLive && !item.isSold) return false;
  //       return true;
  //     });


  return items.map(item => (
    <OrderTableItem
      order={item}
      key={item.id}
    />
  ));
}
