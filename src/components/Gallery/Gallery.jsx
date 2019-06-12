import React, { useState } from 'react';
import { Grid } from 'semantic-ui-react';
import { Consumer } from '../../ContextProvider';
import { PaintingCard } from '../Paintings/PaintingCard';
import { FilterArtists } from '../utility/FilterArtists';


export function Gallery() {
  const [artistId, setArtistId] = useState(null);

  return (
    <>
      <span className="filterArtists">
        {'Show only paintings by '}
        <FilterArtists setArtist={setArtistId} showOnlyActive />
      </span>
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
        .filter(painting => painting.artistId === artistId)
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
