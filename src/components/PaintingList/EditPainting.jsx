import React, { useState } from 'react';
import {
  Input, TextArea, Form, Button,
} from 'semantic-ui-react';
import './addPainting.css';
import PropTypes from 'prop-types';
import { compressImage } from '../utility/compressImage';

export function EditPainting({
  user, id, storageRef, artists, edit, history, paintings,
}) {
  const [artistId, setArtistId] = useState((user.userType === 'artist') ? user.artist.id : null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState(null);
  const [medium, setMedium] = useState('');
  const [height, setHeight] = useState(NaN);
  const [width, setWidth] = useState(NaN);


  async function handleSubmit(e, firebaseStorage) {
    e.preventDefault();
    setLoading(true);

    const editedPainting = {
      name,
      artistId,
      submittedDescription: description,
      liveDescription: description,
      medium,
      height,
      width,
      originalPrice: price,
    };
    const mainImg = await compressImage(photo, 'mainImg');
    const thumbImg = await compressImage(photo, 'thumbImg');


    edit.painting({
      imgUrl: await firebaseStorage.child(`${Date.now()}-${name}-main`)
        .put(mainImg)
        .then(response => response.ref.getDownloadURL()),
      thumbUrl: await firebaseStorage.child(`${Date.now()}-${name}-thumb`)
        .put(thumbImg)
        .then(response => response.ref.getDownloadURL()),
    }, id).then(history.goBack);
  }


  return (
    <Form loading={loading} onSubmit={e => handleSubmit(e, storageRef)}>
      <Form.Field
        required
        value={name}
        onChange={(_e, { value }) => setName(value)}
        control={Input}
        label="Painting Name"
        placeholder="Painting name"
        id="name"
      />

      <Form.Group widths={8}>
        <Form.Select
          width="6"
          label="Artist Name"
          required
          disabled={user.userType === 'artist'}
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
          width="6"

          required
          value={medium}
          onChange={(_e, { value }) => setMedium(value)}
          control={Input}
          label="Medium"
          placeholder="Oil on Canvas"
        />
        <Form.Field
          required
          control="input"
          type="number"
          label="Price"
          onChange={e => setPrice(e.target.value)}
          placeholder="Suggest a price for us"
          width="6"
        />
      </Form.Group>

      <Form.Group>
        <Form.Field
          control="input"
          width="4"
          required

          type="number"
          label="Height in inches"
          onChange={e => setHeight(e.target.value)}
          placeholder="24"
        />
        <Form.Field
          width="4"
          required

          control="input"
          type="number"
          label="Width in inches"
          onChange={e => setWidth(e.target.value)}
          placeholder="36"
        />
        <Form.Field
          width="8"
          required

          control="input"
          type="file"
          label="Photo"
          onChange={e => setPhoto(e.target.files[0])}
          placeholder="Upload an image"
        />
      </Form.Group>

      <TextArea
        value={description}
        onChange={(_e, { value }) => setDescription(value)}
        required

        rows={7}
        placeholder="Painting description"
      />


      <Button type="submit" content="Save" color="purple" width="4" />
    </Form>
  );
}


EditPainting.propTypes = {
  setActiveTab: PropTypes.func.isRequired,
  user: PropTypes.shape({
    userType: PropTypes.string.isRequired,
  }).isRequired,
  storageRef: PropTypes.shape({
    child: PropTypes.func.isRequired,
  }).isRequired,
  artists: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })).isRequired,
  edit: PropTypes.shape({
    painting: PropTypes.func.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,

};
