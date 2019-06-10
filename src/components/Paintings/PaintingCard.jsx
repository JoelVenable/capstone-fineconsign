import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card, Image, Button, Icon,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './painting.css';

export function PaintingCard({
  artist,
  artistId,
  currentPrice,
  forSaleDate,
  id,
  imgUrl,
  isLive,
  isPriced,
  isSold,
  liveDescription,
  name,
  originalPrice,
  priceAdjustmentId,
  submittedDescription,
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
        <Link to={`/paintings/${id}`}>
          <Button icon labelPosition="right" className="ui button">
          Details
            <Icon name="search" />
          </Button>
        </Link>
      </Card.Description>
    </Card>
  );
}
