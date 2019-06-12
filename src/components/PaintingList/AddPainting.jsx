import React, { useState } from 'react';
import { Input, TextArea, Form } from 'semantic-ui-react';
import './addPainting.css';
import { FilterArtists } from '../utility/FilterArtists';
import { Consumer } from '../../ContextProvider';

export function AddPainting() {
  const [artistId, setArtistId] = useState(null);

  return (
    <Form>
      <Form.Field required control={Input} label="Painting Name" placeholder="Painting name" />
      <Consumer>
        {({ artists }) => (
          <Form.Select
            label="Artist Name"
            required
            options={artists.map(artist => ({
              key: artist.id,
              text: `${artist.firstName} ${artist.lastName}`,
              value: artist.id,
              image: { avatar: true, src: artist.artistImageUrl },
            }))}
          />
        )
        }
      </Consumer>

      <TextArea rows={7} placeholder="Painting description" />


    </Form>
  );
}
