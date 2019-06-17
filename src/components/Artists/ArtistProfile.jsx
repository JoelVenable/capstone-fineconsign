import React from 'react';
import {
  Image, Header, Grid, Button,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Consumer } from '../../ContextProvider';
import { PaintingCard } from '../Paintings/PaintingCard';

export function ArtistProfile({ id }) {
  return (
    <Consumer>
      {({ artists, user, history }) => {
        const artist = artists.find(item => item.id === id);
        let controls = null;
        if (user) {
          if (user.userType === 'artist') {
            if (user.artist.id === id) {
              controls = (
                <>
                  <Button onClick={() => history.push(`/artists/${id}/edit`)}>
                    Edit my Profile
                  </Button>
                </>
              );
            }
          }
        }
        return artist ? (
          <>
            <Grid stackable style={{ marginBottom: '4rem' }}>
              <Grid.Column width="6">
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Image fluid src={artist.artistImageUrl} alt={`${artist.firstName} ${artist.lastName}`} />
                  {controls}
                </div>
              </Grid.Column>
              <Grid.Column width="10">
                <Header as="h1">

                  <Header.Content>{`${artist.firstName} ${artist.lastName}`}</Header.Content>
                  <Header.Subheader>Hometown: someplace...</Header.Subheader>
                </Header>
                <section style={{ whiteSpace: 'pre-wrap' }}>
                  {artist.artistDescription}
                </section>
              </Grid.Column>
            </Grid>

            <Header as="h4">
              <Header.Content>Featured Paintings</Header.Content>
            </Header>
            <Grid container>
              {artist.paintings.map(painting => (
                <Grid.Column
                  mobile={16}
                  tablet={8}
                  computer={5}
                  key={painting.id}
                >
                  <PaintingCard {...painting} artist={artist} />
                </Grid.Column>
              ))}
            </Grid>
          </>
        ) : (
          <Header>
              Artist not found!
          </Header>
        );
      }}
    </Consumer>
  );
}


ArtistProfile.propTypes = {
  id: PropTypes.number.isRequired,
};
