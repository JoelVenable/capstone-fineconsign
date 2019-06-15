import React from 'react';
import {
  Image, Header, Rail, Grid, Container,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Consumer } from '../../ContextProvider';
import { PaintingCard } from '../Paintings/PaintingCard';

export function ArtistProfile({ id }) {
  return (
    <Consumer>
      {({ artists }) => {
        const artist = artists.find(artist => artist.id === id);
        return artist ? (
          <Grid>
            <Grid.Column width={10}>
              <Image floated="left" size="small" src={artist.artistImageUrl} alt={`${artist.firstName} ${artist.lastName}`} />
              <Header as="h1">

                <Header.Content>{`${artist.firstName} ${artist.lastName}`}</Header.Content>
                <Header.Subheader>Hometown: someplace...</Header.Subheader>
              </Header>
              <section>
                {artist.artistDescription}
              </section>
            </Grid.Column>
            <Grid.Column width={6}>
              <Header as="h4">
                <Header.Content>Featured Paintings</Header.Content>
              </Header>
              {artist.paintings.map(painting => <PaintingCard {...painting} artist={artist} />)}
            </Grid.Column>
          </Grid>
        ) : null;
      }}
    </Consumer>
  );
}


ArtistProfile.propTypes = {
  id: PropTypes.number.isRequired,
};
