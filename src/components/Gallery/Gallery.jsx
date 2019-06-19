import React, { useState } from 'react';
import { Grid, Header, Icon } from 'semantic-ui-react';
import { Consumer } from '../../ContextProvider';
import { PaintingCard } from '../Paintings/PaintingCard';
import { FilterArtists } from '../utility/FilterArtists';


export function Gallery() {
  const [artistId, setArtistId] = useState(null);
  const [sold, setSold] = useState(false);

  return (
    <>
      <Header as="h4">
        <Icon name="paint brush" />
        <Header.Content>
          {'Filter by Artist: '}
          <FilterArtists setArtist={setArtistId} showOnlyActive={!sold} />
        </Header.Content>
      </Header>
      <Grid container>
        {artistId ? filterPaintings(artistId) : showAllPaintings()}

      </Grid>
    </>
  );
}


function filterPaintings(artistId) {
  return (
    <Consumer>
      {({ paintings }) => paintings
        .filter(painting => painting.artistId === artistId && painting.isLive)
        .map(showPainting)}
    </Consumer>
  );
}

function showAllPaintings() {
  return (
    <Consumer>
      {({ paintings }) => paintings.map(showPainting)}
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
