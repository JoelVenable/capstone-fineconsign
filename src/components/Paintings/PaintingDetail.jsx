import React from 'react';
import { Container, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
// import { API } from '../../modules/api/API';
import { Consumer } from '../../ContextProvider';

// const getPainting = async id => await API.paintings.getOne(id);


export function PaintingDetail({ id }) {
  // const [painting, setPainting] = React.useState([]);
  // setPainting(getPainting(id));

  return (
    <>
      <Container text>
        <Consumer>
          {({ paintings }) => {
            const painting = paintings.find(pntg => pntg.id === id);
            return painting ? (
              <>
                <img src={painting.imgUrl} alt={painting.name} />
                <h3>{painting.name}</h3>
                <p>{`${painting.artist.firstName} ${painting.artist.lastName}`}</p>
                <p>{painting.liveDescription}</p>
                <p>
Current Price: $
                  {painting.currentPrice}
                </p>
                <p style={{ textDecoration: 'line-through' }}>
Original Price: $
                  {painting.originalPrice}
                </p>
                <Button primary>Buy now</Button>
              </>
            ) : <>No painting found!</>;
          }}
        </Consumer>
      </Container>
    </>
  );
}


PaintingDetail.propTypes = {
  id: PropTypes.number.isRequired,
};
