import React, { useContext } from 'react';
import { Grid } from 'semantic-ui-react';
import { Context } from '../../ContextProvider';
import { ArtistCard } from './ArtistCard';

export function Artists() {
  const { artists } = useContext(Context);

  return (
    <Grid container>
      {artists.map(artist => (
        <Grid.Column mobile={16} tablet={8} computer={5} key={artist.id}>
          <ArtistCard {...artist} />
        </Grid.Column>
      ))}
    </Grid>
  );
}
