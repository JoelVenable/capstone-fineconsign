import React, { useState } from 'react';
import {
  Image, Button, Icon, Table, Header,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ArtistNameLink } from '../Artists/ArtistNameLink';
import { DeleteOrderItemModal } from './DeleteOrderItemModal';


export function PaintingOrderItem({
  painting, user: { userType }, edit, updateAll, showControls,
}) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleOpen = () => setIsModalVisible(true);
  const handleClose = () => setIsModalVisible(false);
  const { isCancelled, cancelMessage } = painting.orderItem;


  return (
    <Table.Row>
      <DeleteOrderItemModal
        isModalVisible={isModalVisible}
        handleClose={handleClose}
        edit={edit}
        updateAll={updateAll}
        orderItemId={painting.orderItem.id}
      />
      <Table.Cell selectable={!isCancelled}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          {isCancelled ? (
            <>
              <Header
                as="h4"
                image
                style={{
                  minHeight: '58px',
                  paddingLeft: '.5rem',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Image src={painting.thumbUrl} />

                <Header.Content>

                  <strong style={{ textDecoration: 'line-through' }}>{painting.name}</strong>
                  <Header.Subheader>{cancelMessage}</Header.Subheader>
                </Header.Content>
              </Header>
            </>
          ) : (
            <>
              <Link to={`/gallery/${painting.id}`}>
                <Header
                  as="h4"
                  image
                  style={{
                    minHeight: '58px',
                    paddingLeft: '.5rem',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Image src={painting.thumbUrl} />
                  <Header.Content style={{ textDecoration: isCancelled ? 'line-through' : 'none' }}>
                    <strong>{painting.name}</strong>
                    {(userType === 'artist') ? null : (
                      <Header.Subheader>
                        {/* {`${artist.firstName} ${artist.lastName}`} */}
                      </Header.Subheader>
                    )}
                  </Header.Content>
                </Header>
              </Link>
              {showControls ? (
                <Button icon basic onClick={handleOpen}>
                  <Icon name="times circle" color="red" />

                </Button>
              ) : null}
            </>
          )}


        </div>
      </Table.Cell>
      <Table.Cell>
        <ArtistNameLink id={painting.artist.id} isLink={false} />
      </Table.Cell>
      <Table.Cell>
        {isCancelled ? 'Cancelled' : `$${painting.currentPrice}`}

      </Table.Cell>
    </Table.Row>
  );
}


PaintingOrderItem.propTypes = {
  showControls: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  edit: PropTypes.shape({
    orderItem: PropTypes.func.isRequired,
  }).isRequired,
  updateAll: PropTypes.func.isRequired,
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
