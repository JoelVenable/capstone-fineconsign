import React from 'react';
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
        <Button icon labelPosition="right" class="ui button">
          Details
          <Icon name="search" />
        </Button>
      </Card.Description>
    </Card>
  );
}
