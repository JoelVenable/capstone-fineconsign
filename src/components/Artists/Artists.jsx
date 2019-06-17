import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Consumer } from '../../ContextProvider';
import { ArtistCard } from './ArtistCard';

export function Artists() {
  return (
    <Grid container>
      <Consumer>
        {({ artists }) => artists.map(artist => (
          <Grid.Column
            mobile={16}
            tablet={8}
            computer={5}
            key={artist.id}
          >
            <ArtistCard {...artist} />
          </Grid.Column>
        ))}
      </Consumer>
    </Grid>


  );
}
