import React from 'react';
import {
  Image, Button, Icon, Table, Header,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

export function PaintingTableItem({
  painting,
}) {
  return (
    <Table.Row>

      <Table.Cell selectable>
        <Header as="h4" image style={{ paddingLeft: '.5rem' }}>
          <Image src={painting.thumbUrl} />
          <Header.Content>
            <strong>{painting.name}</strong>
            <Header.Subheader>
              {`${painting.artist.firstName} ${painting.artist.lastName}`}
            </Header.Subheader>
          </Header.Content>
        </Header>
      </Table.Cell>
      <Table.Cell>
        <Header>
          Some stuff
        </Header>


      </Table.Cell>
      <Table.Cell>
        <div className="table-actionIconContainer">
          <Button icon>
            <Icon name="edit" />
          </Button>
          <Button icon color="orange">
            <Icon name="trash" />
          </Button>
        </div>
      </Table.Cell>
      {/* <Image className="painting--card-image" src={thumbUrl} alt={name} />
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
      </Card.Description> */}
    </Table.Row>
  );
}

PaintingTableItem.propTypes = {
  painting: PropTypes.shape({
    artist: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
    }).isRequired,
    //   artistId: PropTypes.number.isRequired,
    // currentPrice: PropTypes.number.isRequired,
    // forSaleDate: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    // imgUrl: PropTypes.string.isRequired,
    // liveDescription: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    originalPrice: PropTypes.number.isRequired,
    priceAdjustmentId: PropTypes.number.isRequired,
    submittedDescription: PropTypes.string.isRequired,
    thumbUrl: PropTypes.string.isRequired,
  }).isRequired,
};
