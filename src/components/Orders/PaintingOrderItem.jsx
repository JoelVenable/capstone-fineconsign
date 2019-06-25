import React from 'react';
import {
  Image, Button, Icon, Table, Header, Responsive,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ArtistNameLink } from '../Artists/ArtistNameLink';


export function PaintingOrderItem({
  painting, user: { userType }, removeFromCart,
}) {
  return (
    <Table.Row>

      <Table.Cell selectable>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
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
                    {/* {`${artist.firstName} ${artist.lastName}`} */}
                  </Header.Subheader>
                )}
              </Header.Content>
            </Header>
          </Link>

          <Button icon basic onClick={() => removeFromCart(painting.id)}>
            <Icon name="times circle" color="red" />

          </Button>
        </div>
      </Table.Cell>
      <Table.Cell>
        <ArtistNameLink id={painting.artist.id} isLink={false} />
      </Table.Cell>
      <Table.Cell>
        {`$${painting.currentPrice}`}

      </Table.Cell>
    </Table.Row>
  );
}


PaintingOrderItem.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  removeFromCart: PropTypes.func.isRequired,
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
    // priceAdjustmentId: PropTypes.number.isRequired,
    submittedDescription: PropTypes.string.isRequired,
    thumbUrl: PropTypes.string.isRequired,
  }).isRequired,
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
