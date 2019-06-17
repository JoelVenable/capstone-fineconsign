import React from 'react';
import PropTypes from 'prop-types';
import { Header, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Consumer } from '../../ContextProvider';

export function ArtistNameLink({ id }) {
  return (
    <Consumer>
      {({ artists }) => {
        const found = artists.find(artist => artist.id === id);
        return found ? (
          <Link to={`/artists/${id}`}>
            <Header as="h4" image>
              <Image circular src={found.avatarUrl} alt={`${found.firstName} ${found.lastName}`} />
              <Header.Content>
                {`${found.firstName} ${found.lastName}`}
                <Header.Subheader>
                  {found.hometown}
                </Header.Subheader>
              </Header.Content>
            </Header>
          </Link>
        ) : null;
      }}
    </Consumer>
  );
}

ArtistNameLink.propTypes = {
  id: PropTypes.number.isRequired,
};
