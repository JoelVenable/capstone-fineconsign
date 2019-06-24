import React from 'react';
import {
  Image, Button, Icon, Table, Header, Popup,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Consumer } from '../../ContextProvider';
import { EditButton } from '../utility/EditButton';
import { DeactivateButton } from '../utility/DeactivateButton';


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
        {showControls(userType, painting, history)}

      </Table.Cell>

    </Table.Row>
  );
}

function showControls(userType, {
  isSubmitted, isLive, isSold, id, isReviewed, isPendingSale,
}, history) {
  if (userType === 'artist') {
    if (isSold) return null;
    if (isLive) return null;
    if (isSubmitted) return null;
    return (
      <div className="table-actionIconContainer">
        <EditButton id={id} history={history} />

        <Consumer>
          {({ edit, showConfirm }) => (
            <Button
              icon
              color="green"
              onClick={() =>
                showConfirm({
                  title: 'Send Painting for Employee Review', // REQUIRED.  The title of the message requesting delete confirmation
                  text: 'Please confirm; you cannot reverse this action.', // The inner content of text to be displayed
                  confirmAction: () => edit.painting({ isSubmitted: true }, id), // Function called when action is confirmed
                  confirmBtnColor: 'green', // String value.  Accepts color of confirmation button.
                  icon: 'arrow circle right', // String value or null.  Icon next to the title
                  btnIcon: 'send', // String value or null.  Icon inside the confirmation button
                  btnText: 'Send it!',
                })}
            >
              <Icon name="send" />
            </Button>
          )}
        </Consumer>
      </div>
    );
  }
  if (userType === 'employee') {
    if (isSold) return null; // TODO: display complete order.
    if (isLive) {
      return (
        <div className="table-actionIconContainer">
          <EditButton id={id} history={history} />
          <DeactivateButton id={id} />
        </div>
      );
    }
    if (isSubmitted) {
      return (
        <div className="table-actionIconContainer">
          <EditButton id={id} history={history} />
          <Consumer>
            {({ edit, showConfirm }) => (
              <Button
                icon
                color="green"
                onClick={() =>
                  showConfirm({
                    title: 'Show this painting to customers!', // REQUIRED.  The title of the message requesting delete confirmation
                    text: '', // The inner content of text to be displayed
                    confirmAction: () => edit.painting({ isLive: true }, id), // Function called when action is confirmed
                    confirmBtnColor: 'green', // String value.  Accepts color of confirmation button.
                    icon: 'bullhorn', // String value or null.  Icon next to the title
                    btnIcon: 'fire', // String value or null.  Icon inside the confirmation button
                    btnText: 'Go Live!',
                  })}
              >
                <Icon name="send" />
              </Button>
            )}
          </Consumer>
        </div>
      );
    }
  }
  //  Under normal circumstances, this final return
  //  statement should never be reached...
  return null;
}

function showStatus(userType, {
  isSubmitted, isLive, isSold, currentPrice, isReviewed,
}) {
  if (userType === 'artist') {
    if (isSold) return <Header as="h4" color="green">{`Sold for $${currentPrice}`}</Header>;
    if (isLive) return <Header as="h4" color="blue">For Sale</Header>;
    if (isSubmitted) {
      if (isReviewed) return <Header as="h4" color="violet">Reviewed</Header>;
      return <Header as="h4" color="olive">Submitted</Header>;
    }
    return <Header as="h4" color="orange">Draft</Header>;
  }

  if (userType === 'employee') {
    if (isSold) return <Header as="h4" color="green">{`Sold for $${currentPrice}`}</Header>;
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
