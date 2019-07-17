import React, { useContext } from 'react';
import {
  Image, Header, Grid, Icon,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Context } from '../../ContextProvider';
import { PaintingCard } from '../Paintings/PaintingCard';
import { EditArtistButton } from './EditArtistButton';

export function ArtistProfile({ id }) {
  const { artists, user, history } = useContext(Context);
  const artist = artists.find(item => item.id === id);

  let controls = null;
  if (user) {
    if (user.userType === 'artist') {
      if (user.artist.id === id) {
        controls = (
          <EditArtistButton
            id={id}
            push={history.push}
            text="Edit my Profile"
          />
        );
      }
    } else if (user.userType === 'employee') {
      if (user.employee.canEditCustomers) {
        controls = (
          <EditArtistButton
            id={id}
            push={history.push}
            text="Edit Artist's Profile"
          />
        );
      }
    }
  }

  return artist ? (
    <>
      <Grid stackable style={{ marginBottom: '4rem' }}>
        <Grid.Column width="6">
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {controls}
            {artist.imgUrl ? (
              <Image
                fluid
                src={artist.imgUrl}
                alt={`${artist.firstName} ${artist.lastName}`}
              />
            ) : (
              <Icon name="user circle" />
            )}
          </div>
        </Grid.Column>
        <Grid.Column width="10">
          <Header as="h1">
            <Header.Content>
              {`${artist.firstName} ${artist.lastName}`}
            </Header.Content>
            <Header.Subheader>
              {'Hometown: '}
              {artist.hometown ? artist.hometown : 'Not Provided'}
            </Header.Subheader>
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
        {artist.paintings
          .filter(
            ({ isLive, isSold, isPendingSale }) =>
              isLive || isSold || isPendingSale,
          )
          .map(painting => (
            <Grid.Column mobile={16} tablet={8} computer={5} key={painting.id}>
              <PaintingCard {...painting} artist={artist} />
            </Grid.Column>
          ))}
      </Grid>
    </>
  ) : (
    <Header>Artist not found!</Header>
  );
}

ArtistProfile.propTypes = {
  id: PropTypes.number.isRequired,
};
