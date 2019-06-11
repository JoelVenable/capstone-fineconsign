import React, { useState } from 'react';
import { Grid, Dropdown } from 'semantic-ui-react';
import { Navbar } from '../Navbar';
import { Consumer } from '../../ContextProvider';
import { PaintingCard } from '../Paintings/PaintingCard';
import { FilterArtists } from '../utility/FilterArtists';


export function Gallery() {
  const [artistId, setArtistId] = useState(null);

  return (
    <>
      <Navbar />
      <span>
        {'Show only paintings by '}
        <FilterArtists setArtist={setArtistId} showOnlyActive />
      </span>
      <Grid container />
    </>
  );
}


// paintings.map(
//   painting => (
//     <Grid.Column
//       mobile={16}
//       tablet={8}
//       computer={5}
//       key={painting.id}
//     >
//       <PaintingCard {...painting} />
//     </Grid.Column>
//   ),
// )
