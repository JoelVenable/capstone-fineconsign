import React, { useState } from 'react';
import {
  Input, TextArea, Form, Button,
} from 'semantic-ui-react';
import './addPainting.css';
import PropTypes from 'prop-types';
import { compressImage } from '../utility/compressImage';

export function AddPainting({
  setActiveTab, user, storageRef, artists, add, history,
}) {
  const [artistId, setArtistId] = useState((user.userType === 'artist') ? user.artist.id : null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState(null);


  async function handleSubmit(e, firebaseStorage) {
    e.preventDefault();
    setLoading(true);
    const mainImg = await compressImage(photo, 'mainImg');
    const thumbImg = await compressImage(photo, 'thumbImg');

    add.painting({
      name,
      artistId,
      submittedDescription: description,
      liveDescription: null,
      forSaleDate: null,
      imgUrl: await firebaseStorage.child(`${Date.now()}-${name}-main`)
        .put(mainImg)
        .then(response => response.ref.getDownloadURL()),
      thumbUrl: await firebaseStorage.child(`${Date.now()}-${name}-thumb`)
        .put(thumbImg)
        .then(response => response.ref.getDownloadURL()),
      originalPrice: price,
      currentPrice: price,
      priceAdjustmentId: null,
      isSubmitted: false,
      isLive: false,
      isSold: false,
    }).then(() => setActiveTab(0));
  }


  return (
    <Form loading={loading} onSubmit={e => handleSubmit(e, storageRef, add, history)}>
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
  );
}


AddPainting.propTypes = {
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
  add: PropTypes.shape({
    painting: PropTypes.func.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,

};
