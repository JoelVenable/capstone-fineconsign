import React from 'react';
import {
  Image, Table, Header,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Consumer } from '../../ContextProvider';
import { EditButton } from '../utility/EditButton';
import { DeactivateButton } from '../utility/DeactivateButton';
import { GoLiveButton } from '../utility/GoLiveButton';
import { OrderButton } from '../utility/OrderButton';
import { SendForReviewButton } from '../utility/SendForReviewButton';
import { KickbackButton } from '../utility/KickbackButton';
import { PaintingControls } from './PaintingControls';

export function PaintingTableItem({
  painting, user: { userType }, history,
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
        {/* {showControls(userType, painting, history)} */}
        <PaintingControls id={painting.id} />
      </Table.Cell>

    </Table.Row>
  );
}

function showControls(userType, {
  isSubmitted, isLive, isSold, id, isReviewed, isPendingSale,
}, history) {
  if (userType === 'artist') {
    if (isSold || isLive || isSubmitted || isPendingSale) return null;
    return (
      <div className="table-actionIconContainer">
        <EditButton id={id} history={history} />
        <SendForReviewButton id={id} />
      </div>
    );
  }
  if (userType === 'employee') {
    if (isSold) return null; // TODO: display complete order.
    if (isPendingSale) {
      return (
        <div className="table-actionIconContainer">
          <Consumer>
            {(context) => {
              console.log(context);
              return <OrderButton id={null} history={history} />;
            }}
          </Consumer>
        </div>
      );
    }
    if (isLive) {
      return (
        <div className="table-actionIconContainer">
          <DeactivateButton id={id} />
          <EditButton id={id} history={history} />
        </div>
      );
    }
    if (isSubmitted) {
      return (
        <div className="table-actionIconContainer">
          <KickbackButton id={id} />
          <EditButton id={id} history={history} />
          <GoLiveButton id={id} />
        </div>
      );
    }
  }
  //  Under normal circumstances, this final return
  //  statement should never be reached...
  return null;
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
    originalPrice: PropTypes.number.isRequired,
    priceAdjustmentId: PropTypes.number.isRequired,
    submittedDescription: PropTypes.string.isRequired,
    thumbUrl: PropTypes.string.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    userType: PropTypes.string.isRequired,
  }).isRequired,
};
