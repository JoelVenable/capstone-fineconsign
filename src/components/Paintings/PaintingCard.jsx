import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card, Image, Button, Icon,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './painting.css';

export function PaintingCard({
  artist,
  // artistId,
  currentPrice,
  // forSaleDate,
  id,
  // imgUrl,
  // isLive,
  // isPriced,
  // isSold,
  // liveDescription,
  name,
  // originalPrice,
  // priceAdjustmentId,
  // submittedDescription,
  thumbUrl,
}) {
  return (
    <Card>
      <Image className="painting--card-image" src={thumbUrl} alt={name} />
      <Card.Header className="painting--card-header">{name}</Card.Header>
      <Card.Meta className="painting--card-meta">
        {'By: '}
        {`${artist.firstName} ${artist.lastName}`}
      </Card.Meta>
      <Card.Description className="painting--card-description">
        {`Price: $${currentPrice}`}
        <Link to={`/gallery/${id}`}>
          <Button icon labelPosition="right" className="ui button">
          Details
            <Icon name="search" />
          </Button>
        </Link>
      </Card.Description>
    </Card>
  );
}

PaintingCard.propTypes = {
  artist: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
  }).isRequired,
  // artistId: PropTypes.number.isRequired,
  currentPrice: PropTypes.number.isRequired,
  // forSaleDate: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  // imgUrl: PropTypes.string.isRequired,
  // isLive: PropTypes.bool.isRequired,
  // isPriced: PropTypes.bool.isRequired,
  // isSold: PropTypes.bool.isRequired,
  // liveDescription: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  // originalPrice: PropTypes.number.isRequired,
  // priceAdjustmentId: PropTypes.number.isRequired,
  // submittedDescription: PropTypes.string.isRequired,
  thumbUrl: PropTypes.string.isRequired,
};
