import React from 'react';
import { Container, Button, Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
// import { API } from '../../modules/api/API';
import { Consumer } from '../../ContextProvider';
import { ArtistNameLink } from '../Artists/ArtistNameLink';

// const getPainting = async id => await API.paintings.getOne(id);


export function PaintingDetail({ id }) {
  // const [painting, setPainting] = React.useState([]);
  // setPainting(getPainting(id));
  return (
    <>
      <Container>
        <Grid stackable>
          <Consumer>
            {({ paintings }) => {
              const painting = paintings.find(pntg => pntg.id === id);
              return painting ? (
                <>
                  <Grid.Column width="6">
                    <img src={painting.imgUrl} alt={painting.name} />
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
                    <Button primary>Buy now</Button>
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
