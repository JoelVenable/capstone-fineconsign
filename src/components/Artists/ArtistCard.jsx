import React from 'react';
import PropTypes from 'prop-types';
import {
  Card, Image, Button, Icon,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export function ArtistCard({
  id, firstName, lastName, artistImageUrl, hometown,
}) {
  return (
    <Card>
      <Image className="painting--card-image" src={artistImageUrl} alt={`${firstName} ${lastName}`} />
      <Card.Header className="painting--card-header">{`${firstName} ${lastName}`}</Card.Header>
      <Card.Meta className="painting--card-meta">
        {`Hometown: ${hometown}`}
      </Card.Meta>
      <Card.Description className="painting--card-description">
        {/* {`Price: $${currentPrice}`} */}
        <Link to={`/artists/${id}`}>
          <Button icon labelPosition="right" className="ui button">
            Details
            <Icon name="search" />
          </Button>
        </Link>
      </Card.Description>
    </Card>
  );
}


ArtistCard.propTypes = {
  id: PropTypes.number.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  artistImageUrl: PropTypes.string.isRequired,
  hometown: PropTypes.string,
};


ArtistCard.defaultProps = {
  hometown: 'Not provided',
};
