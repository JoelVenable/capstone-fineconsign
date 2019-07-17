import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { ArtistNameLink } from '../Artists/ArtistNameLink';
import { ShowStatus } from './ShowStatus';

export function ArtistTableItem({ artist }) {
  return (
    <Table.Row>
      <Table.Cell selectable>
        <ArtistNameLink id={artist.id} />
      </Table.Cell>
      <Table.Cell>
        <ShowStatus />
      </Table.Cell>
      <Table.Cell />
    </Table.Row>
  );
}

ArtistTableItem.propTypes = {
  artist: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};
