import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import { PaintingTableItem } from './PaintingTableItem';


export function PaintingTable({ paintingList, tableType, user }) {
  return (
    <Table unstackable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>
  Painting
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
        {renderTableItems(paintingList, user)}
      </Table.Body>
    </Table>
  );
}

PaintingTable.propTypes = {
  paintingList: PropTypes.arrayOf(PropTypes.object).isRequired,
  tableType: PropTypes.oneOf(['pending', 'active', 'sold']).isRequired,
};


function renderTableItems(items, user) {
  let newItems = (user.userType === 'artist')
    ? items.filter(item => item.artistId === user.artist.id)
    : null;

  if (user.userType === 'employee') {
    newItems = items.filter((item) => {
      if (!item.isSubmitted && !item.isLive && !item.isSold) return false;
      return true;
    });
  }


  return newItems.map(item => <PaintingTableItem painting={item} user={user} key={item.id} />);
}
