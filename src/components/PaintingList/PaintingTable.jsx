import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import { PaintingTableItem } from './PaintingTableItem';


export function PaintingTable({ paintingList, tableType }) {
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
        {renderTableItems(paintingList)}
      </Table.Body>
    </Table>
  );
}

PaintingTable.propTypes = {
  paintingList: PropTypes.arrayOf(PropTypes.object).isRequired,
  tableType: PropTypes.oneOf(['pending', 'active', 'sold']).isRequired,
};


function renderTableItems(items) {
  return items.map(item => <PaintingTableItem painting={item} key={item.id} />);
}
