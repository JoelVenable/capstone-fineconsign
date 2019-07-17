import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Header, Image, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Context } from '../../ContextProvider';

export function ArtistNameLink({ id, isLink }) {
  const { artists } = useContext(Context);
  const found = artists.find(artist => artist.id === id);

  if (found) {
    return isLink ? (
      <Link to={`/artists/${id}`}>
        <InternalLink {...found} />
      </Link>
    ) : (
      <InternalLink {...found} />
    );
  }
  return null;
}

ArtistNameLink.propTypes = {
  id: PropTypes.number.isRequired,
  isLink: PropTypes.bool,
};

ArtistNameLink.defaultProps = {
  isLink: true,
};

function InternalLink({
  avatarUrl, firstName, lastName, hometown,
}) {
  return (
    <Header as="h4" image>
      {avatarUrl ? (
        <Image circular src={avatarUrl} alt={`${firstName} ${lastName}`} />
      ) : (
        <Icon name="paint brush" circular />
      )}
      <Header.Content>
        {`${firstName} ${lastName}`}
        <Header.Subheader>{hometown}</Header.Subheader>
      </Header.Content>
    </Header>
  );
}

InternalLink.propTypes = {
  avatarUrl: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  hometown: PropTypes.string.isRequired,
};
