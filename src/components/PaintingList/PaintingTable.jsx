import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import { PaintingTableItem } from './PaintingTableItem';


export function PaintingTable({ paintingList, user, history }) {
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
        {renderTableItems(paintingList, user, history)}
      </Table.Body>
    </Table>
  );
}

PaintingTable.propTypes = {
  paintingList: PropTypes.arrayOf(PropTypes.object).isRequired,
  user: PropTypes.shape({
    userType: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};


function renderTableItems(items, user, history) {
  let newItems = (user.userType === 'artist')
    ? items.filter(item => item.artistId === user.artist.id)
    : null;

  if (user.userType === 'employee') {
    newItems = items.filter((item) => {
      if (!item.isSubmitted && !item.isLive && !item.isSold) return false;
      return true;
    });
  }


  return newItems.map(item => (
    <PaintingTableItem
      painting={item}
      history={history}
      user={user}
      key={item.id}
    />
  ));
}
