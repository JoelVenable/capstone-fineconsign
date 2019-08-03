import React, { useState, useContext, useEffect } from 'react';
import { Container, Grid, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
// import { API } from '../../modules/api/API';
import { Context } from '../../ContextProvider';
import { ArtistNameLink } from '../Artists/ArtistNameLink';
import { PaintingControls } from '../PaintingList/PaintingControls';
import { BuyButton } from './BuyButton';

// const getPainting = async id => await API.paintings.getOne(id);

export function PaintingDetail({ id }) {
  const { paintings, user } = useContext(Context);
  const [showBuyButton, setShowBuyButton] = useState(false);

  const painting = paintings.find(pntg => pntg.id === id);

  useEffect(() => {
    if (user) {
      if (user.userType === 'customer') setShowBuyButton(true);
    } else setShowBuyButton(true);
  }, [user]);


  // const [painting, setPainting] = React.useState([]);
  // setPainting(getPainting(id));
  return (
    <Container>
      <Grid stackable>
        {painting ? (
          <>
            <Grid.Column width="6">
              <Image fluid src={painting.imgUrl} alt={painting.name} />
            </Grid.Column>
            <Grid.Column width="10">
              <h3>{painting.name}</h3>
              <ArtistNameLink id={painting.artistId} />
              <p style={{ marginTop: '1rem' }}>
                {`Size: ${painting.height}" x ${painting.width}"`}
              </p>
              <p style={{ marginTop: '1rem' }}>
                {`Medium: ${painting.medium}`}
              </p>

              <p style={{ whiteSpace: 'pre-wrap', marginTop: '1rem' }}>
                {painting.liveDescription}
              </p>
              <p>
Price: $
                {painting.currentPrice}
              </p>
              {showBuyButton ? <BuyButton id={id} painting={painting} /> : null}
              <PaintingControls id={id} />
            </Grid.Column>
          </>
        ) : (
          <>No painting found!</>
        )}
      </Grid>
    </Container>
  );
}

PaintingDetail.propTypes = {
  id: PropTypes.number.isRequired,
};
