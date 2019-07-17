import React, { useState, useContext } from 'react';
import {
  Grid, Icon, Table, Checkbox,
} from 'semantic-ui-react';
import { Context } from '../../ContextProvider';
import { PaintingCard } from '../Paintings/PaintingCard';
import { FilterArtists } from '../utility/FilterArtists';

export function Gallery() {
  const [artistId, setArtistId] = useState(null);
  const [sold, setSold] = useState(false);
  const { paintings } = useContext(Context);

  return (
    <>
      <Table basic>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell textAlign="center" verticalAlign="middle">
              <Icon name="paint brush" />
              {'Filter by Artist: '}
              <FilterArtists setArtist={setArtistId} showOnlyActive />
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center" verticalAlign="middle">
              <Checkbox
                slider
                label="Show sold paintings"
                onChange={(_e, data) => {
                  setSold(data.checked);
                }}
              />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>

      <Grid container>
        {paintings
          .filter(painting =>
            (sold
              ? painting.isSold || painting.isPendingSale
              : painting.isLive && !painting.isSold))
          .filter(painting =>
            (artistId ? painting.artistId === artistId : true))
          .map(painting => (
            <Grid.Column mobile={16} tablet={8} computer={5} key={painting.id}>
              <PaintingCard {...painting} />
            </Grid.Column>
          ))}
      </Grid>
    </>
  );
}
