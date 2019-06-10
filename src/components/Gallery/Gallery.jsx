import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Navbar } from '../Navbar';
import { Consumer } from '../../ContextProvider';
import { PaintingCard } from '../Paintings/PaintingCard';


export function Gallery() {
  return (
    <>
      <Navbar />
      <Grid container>
        <Consumer>
          {({ paintings }) => paintings.map(
            painting => <Grid.Column mobile={16} tablet={8} computer={5}><PaintingCard {...painting} key={painting.id} /></Grid.Column>,
          )}
        </Consumer>
      </Grid>
    </>
  );
}
