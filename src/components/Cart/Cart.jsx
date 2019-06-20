import React from 'react';
import PropTypes from 'prop-types';
import { Header, Table, Grid } from 'semantic-ui-react';
import { PaintingCartItem } from './PaintingCartItem';


export function Cart({
  get, myCart, history, user, artists,
}) {
  console.log('artists', artists);
  return (
    <>
      <Header as="h1">
    My Cart
      </Header>
      <Grid colums="two" divided>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Painting Name</Table.HeaderCell>
              <Table.HeaderCell>Artist</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          {myCart.orderItems.map(item => (
            <PaintingCartItem
              painting={item}
              history={history}
              artist={artists.find((artist) => {
                console.log('artist', artist);
                console.log('item', item);

                return artist.id === item.artistId;
              })}
              user={user}
              key={item.id}
            />
          )) }
        </Table>
      </Grid>
    </>
  );
}

Cart.propTypes = {
  get: PropTypes.shape({
    orders: PropTypes.func.isRequired,
  }),
};
