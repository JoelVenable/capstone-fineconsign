import React from 'react';
import {
  Image, Table, Header,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { PaintingControls } from './PaintingControls';

export function PaintingTableItem({
  painting, user: { userType },
}) {
  return (
    <Table.Row>

      <Table.Cell selectable>
        <Link to={`/gallery/${painting.id}`}>
          <Header
            as="h4"
            image
            style={{
              minHeight: '58px', paddingLeft: '.5rem', display: 'flex', flexDirection: 'row', alignItems: 'center',
            }}
          >
            <Image src={painting.thumbUrl} />
            <Header.Content>
              <strong>{painting.name}</strong>
              {(userType === 'artist') ? null : (
                <Header.Subheader>
                  {`${painting.artist.firstName} ${painting.artist.lastName}`}
                </Header.Subheader>
              )}
            </Header.Content>
          </Header>
        </Link>
      </Table.Cell>
      <Table.Cell>
        {showStatus(userType, painting)}
      </Table.Cell>
      <Table.Cell>
        <PaintingControls id={painting.id} />
      </Table.Cell>

    </Table.Row>
  );
}


function showStatus(userType, {
  isSubmitted, isLive, isSold, currentPrice, isReviewed, isPendingSale,
}) {
  if (userType === 'artist') {
    if (isSold) return <Header as="h4" color="purple">{`Sold for $${currentPrice}`}</Header>;
    if (isPendingSale) return <Header as="h4" color="green">Pending Sale</Header>;
    if (isLive) return <Header as="h4" color="blue">For Sale</Header>;
    if (isSubmitted) {
      if (isReviewed) return <Header as="h4" color="violet">Reviewed</Header>;
      return <Header as="h4" color="olive">Submitted</Header>;
    }
    return <Header as="h4" color="orange">Draft</Header>;
  }

  if (userType === 'employee') {
    if (isSold) return <Header as="h4" color="green">{`Sold for $${currentPrice}`}</Header>;
    if (isPendingSale) return <Header as="h4" color="purple">Pending Sale</Header>;
    if (isLive) return <Header as="h4" color="blue">For Sale</Header>;
    if (isSubmitted) {
      if (isReviewed) return <Header as="h4" color="violet">Reviewed</Header>;
      return <Header as="h4" color="orange">Needs Review</Header>;
    }
  }

  // this line should never be reached...
  return null;
}

PaintingTableItem.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
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
    submittedDescription: PropTypes.string.isRequired,
    thumbUrl: PropTypes.string.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    userType: PropTypes.string.isRequired,
  }).isRequired,
};
