import React, { useState } from 'react';
import {
  Grid, Icon, Table, Checkbox,
} from 'semantic-ui-react';
import { Consumer } from '../../ContextProvider';
import { PaintingCard } from '../Paintings/PaintingCard';
import { FilterArtists } from '../utility/FilterArtists';


export function Gallery() {
  const [artistId, setArtistId] = useState(null);
  const [sold, setSold] = useState(false);
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
        {filterPaintings(artistId, sold)}

      </Grid>
    </>
  );
}


function filterPaintings(artistId, sold) {
  return (
    <Consumer>
      {({ paintings }) => paintings
        .filter(painting => (sold ? painting.isSold || painting.isPendingSale : painting.isLive))
        .filter(painting => (artistId ? painting.artistId === artistId : true))
        .map(showPainting)}
    </Consumer>
  );
}


function showPainting(painting) {
  return (
    <Grid.Column
      mobile={16}
      tablet={8}
      computer={5}
      key={painting.id}
    >
      <PaintingCard {...painting} />
    </Grid.Column>
  );
}
