import React, { useState } from 'react';
import {
  Input, TextArea, Form, Button,
} from 'semantic-ui-react';
import './addPainting.css';
import { Consumer } from '../../ContextProvider';
import { compressImage } from '../utility/compressImage';


export function AddPainting() {
  const [artistId, setArtistId] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);


  async function handleSubmit(e, firebaseStorage, add) {
    e.preventDefault();
    const mainImg = await compressImage(photo, 'mainImg');
    const thumbImg = await compressImage(photo, 'thumbImg');

    add.painting({
      name,
      artistId,
      description,
      imgUrl: await firebaseStorage.child(`${Date.now()}-${name}-main`)
        .put(mainImg)
        .then(response => response.ref.getDownloadURL()),
      thumbUrl: await firebaseStorage.child(`${Date.now()}-${name}-thumb`)
        .put(thumbImg)
        .then(response => response.ref.getDownloadURL()),
    });
  }

  // saveProfile = () => {
  //   const ref = this.storageRef.child(`${Date.now()}`);
  //   ref
  //     .put(this.state.photo)
  //     .then(response => response.ref.getDownloadURL())
  //     .then(url =>
  //       postData({
  //         username: this.state.username,
  //         aboutMe: this.state.aboutMe,
  //         photoUrl: url
  //       })
  //     );
  // };

  function handleChange(_e, { id, value }) {
    console.log(id);
    console.log(value);
  }


  return (
    <Consumer>
      {({ storageRef, artists, add }) => (


        <Form onSubmit={e => handleSubmit(e, storageRef, add)}>
          <Form.Field
            required
            value={name}
            onChange={(_e, { value }) => setName(value)}
            control={Input}
            label="Painting Name"
            placeholder="Painting name"
            id="name"
          />
          <Form.Select
            label="Artist Name"
            required
            options={artists.map(artist => ({
              key: artist.id,
              text: `${artist.firstName} ${artist.lastName}`,
              value: artist.id,
              image: { avatar: true, src: artist.artistImageUrl },
            }))}
            onChange={(_e, { value }) => setArtistId(value)}
            value={artistId}
            id="artistId"
          />

          <Form.Field
            control="input"
            type="file"
            label="Photo"
            onChange={e => setPhoto(e.target.files[0])}
            placeholder="Upload an image"
          />

          <TextArea
            value={description}
            onChange={(_e, { value }) => setDescription(value)}
            rows={7}
            placeholder="Painting description"
          />

          <Button type="submit" content="Save" color="purple" />
        </Form>
      )}
    </Consumer>
  );
}
