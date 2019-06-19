import React from 'react';
import {
  Button, Icon, Table, Label, Popup,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { ArtistNameLink } from '../Artists/ArtistNameLink';

export function ArtistTableItem({
  artist,
}) {
  return (
    <Table.Row>

      <Table.Cell selectable>
        <ArtistNameLink id={artist.id} />
      </Table.Cell>
      <Table.Cell>
        {showStatus(artist)}
      </Table.Cell>
      <Table.Cell>
        {/* {showControls(artist)} */}

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

// function showControls(artist) {
//   //  Under normal circumstances, this final return
//   //  statement should never be reached...


//   return null;
// }

function showStatus({ paintings }) {
  const pending = paintings.filter(painting => painting.isSubmitted && !painting.isLive && !painting.isSold).length;
  const active = paintings.filter(painting => painting.isLive && !painting.isSold).length;
  const sold = paintings.filter(painting => painting.isSold).length;

  return (
    <>
      <Popup
        content={`This artist has ${pending} paintings pending approval`}
        trigger={(
          <Label color="orange">
            <Icon name="pause" />
            {pending}
          </Label>
)}
      />
      <Popup
        content={`This artist has ${active} paintings available for sale`}
        trigger={(
          <Label color="blue">
            <Icon name="bolt" />
            {active}
          </Label>
)}
      />

      <Popup
        content={`This artist has ${sold} sold paintings`}
        trigger={(
          <Label color="green">
            <Icon name="box" />
            {sold}
          </Label>
)}
      />

    </>
  );
}

showStatus.propTypes = {
  paintings: PropTypes.shape({
    isSubmitted: PropTypes.bool.isRequired,
    isLive: PropTypes.bool.isRequired,
    isSold: PropTypes.bool.isRequired,
  }).isRequired,
};

ArtistTableItem.propTypes = {
  artist: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
  }).isRequired,
  // history: PropTypes.shape({
  //   push: PropTypes.func.isRequired,
  // }).isRequired,
  // painting: PropTypes.shape({
  //   artist: PropTypes.shape({
  //     firstName: PropTypes.string.isRequired,
  //     lastName: PropTypes.string.isRequired,
  //   }).isRequired,
  //   //   artistId: PropTypes.number.isRequired,
  //   // currentPrice: PropTypes.number.isRequired,
  //   // forSaleDate: PropTypes.string.isRequired,
  //   id: PropTypes.number.isRequired,
  //   // imgUrl: PropTypes.string.isRequired,
  //   // liveDescription: PropTypes.string.isRequired,
  //   name: PropTypes.string.isRequired,
  //   originalPrice: PropTypes.number.isRequired,
  //   priceAdjustmentId: PropTypes.number.isRequired,
  //   submittedDescription: PropTypes.string.isRequired,
  //   thumbUrl: PropTypes.string.isRequired,
  // }).isRequired,
  user: PropTypes.shape({
    userType: PropTypes.string.isRequired,
  }).isRequired,
};


function EditButton({ id, history }) {
  return (
    <Button icon>
      <Icon name="edit" onClick={() => history.push(`/paintings/${id}/edit`)} />
    </Button>
  );
}


EditButton.propTypes = {
  id: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
