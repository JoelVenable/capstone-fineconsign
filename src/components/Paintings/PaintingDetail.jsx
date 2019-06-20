import React, { useState } from 'react';
import {
  Container, Button, Grid, Image,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
// import { API } from '../../modules/api/API';
import { Consumer } from '../../ContextProvider';
import { ArtistNameLink } from '../Artists/ArtistNameLink';

// const getPainting = async id => await API.paintings.getOne(id);


export function PaintingDetail({ id }) {
  const [showBuyButton, setShowBuyButton] = useState(false);
  // const [painting, setPainting] = React.useState([]);
  // setPainting(getPainting(id));
  console.log(typeof id);
  return (
    <>
      <Container>
        <Grid stackable>
          <Consumer>
            {({ paintings, addToCart, user }) => {
              const painting = paintings.find(pntg => pntg.id === id);
              if (user) {
                if (user.userType === 'customer') setShowBuyButton(true);
              } else setShowBuyButton(true);
              return painting ? (
                <>
                  <Grid.Column width="6">
                    <Image fluid src={painting.imgUrl} alt={painting.name} />
                  </Grid.Column>
                  <Grid.Column width="10">
                    <h3>{painting.name}</h3>
                    <ArtistNameLink id={painting.artistId} />
                    <p style={{ whiteSpace: 'pre-wrap' }}>{painting.liveDescription}</p>
                    <p>
                      Current Price: $
                      {painting.currentPrice}
                    </p>
                    <p style={{ textDecoration: 'line-through' }}>
                      Original Price: $
                      {painting.originalPrice}
                    </p>

                    {showBuyButton ? (
                      <Button primary onClick={() => addToCart(id)}>Buy now</Button>
                    ) : null }
                  </Grid.Column>
                </>
              ) : <>No painting found!</>;
            }}
          </Consumer>

        </Grid>

      </Container>
    </>
  );
}


PaintingDetail.propTypes = {
  id: PropTypes.number.isRequired,
};
