import React from 'react';
import {
  Image, Button, Icon, Table, Header,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Consumer } from '../../ContextProvider';

export function PaintingTableItem({
  painting, user: { userType },
}) {
  return (
    <Table.Row>

      <Table.Cell selectable>
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
            {(userType === 'artist') ? (
              <Header.Subheader>
                {`${painting.artist.firstName} ${painting.artist.lastName}`}
              </Header.Subheader>
            ) : null}
          </Header.Content>
        </Header>
      </Table.Cell>
      <Table.Cell>
        {showStatus(userType, painting)}
      </Table.Cell>
      <Table.Cell>
        {showControls(userType, painting)}

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

function showControls(userType, {
  isSubmitted, isLive, isSold, currentPrice, id,
}) {
  if (userType === 'artist') {
    if (isSold) return null;
    if (isLive) return null;
    if (isSubmitted) return null;
    return (
      <div className="table-actionIconContainer">
        <Button icon>
          <Icon name="edit" />
        </Button>
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
    if (isSold) return null;
    if (isLive) {
      return (
        <div className="table-actionIconContainer">
          <Button icon>
            <Icon name="edit" />
          </Button>
        </div>
      );
    }
    if (isSubmitted) {
      return (
        <div className="table-actionIconContainer">
          <Button icon>
            <Icon name="edit" />
          </Button>
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
}

function showStatus(userType, {
  isSubmitted, isLive, isSold, currentPrice,
}) {
  if (userType === 'artist') {
    if (isSold) return <Header as="h4" color="green">{`Sold for $${currentPrice}`}</Header>;
    if (isLive) return <Header as="h4" color="blue">For Sale</Header>;
    if (isSubmitted) return <Header as="h4" color="purple">Submitted</Header>;
    return <Header as="h4" color="orange">Draft</Header>;
  }

  if (userType === 'employee') {
    if (isSold) return <Header as="h4" color="green">{`Sold for $${currentPrice}`}</Header>;
    if (isLive) return <Header as="h4" color="blue">For Sale</Header>;
    if (isSubmitted) return <Header as="h4" color="orange">Needs Review</Header>;
  }
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
