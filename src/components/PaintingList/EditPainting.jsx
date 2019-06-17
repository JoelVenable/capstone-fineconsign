import React, { useState } from 'react';
import {
  Input, Form, Button, Container, Image,
} from 'semantic-ui-react';
import './addPainting.css';
import PropTypes from 'prop-types';
import { compressImage } from '../utility/compressImage';
import { DeleteButton } from '../utility/DeleteButton';

export function EditPainting({
  user, id, storageRef, artists, edit, remove, history, painting, showError, showConfirm,
}) {
  const [artistId, setArtistId] = useState(painting.artistId);
  const [name, setName] = useState(painting.name);
  const [description, setDescription] = useState(painting.description);
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState(painting.originalPrice);
  const [medium, setMedium] = useState(painting.medium);
  const [height, setHeight] = useState(painting.height);
  const [width, setWidth] = useState(painting.width);


  async function handleSubmit(e) {
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
    if (photo) {
      const mainImg = await compressImage(photo, 'mainImg');
      const thumbImg = await compressImage(photo, 'thumbImg');
      editedPainting.imgUrl = await storageRef.child(`${Date.now()}-${name}-main`)
        .put(mainImg)
        .then(response => response.ref.getDownloadURL());
      editedPainting.thumbUrl = await storageRef.child(`${Date.now()}-${name}-thumb`)
        .put(thumbImg)
        .then(response => response.ref.getDownloadURL());
    }


    edit.painting(editedPainting, id);
    history.goBack();
  }


  return (
    <Container>
      <Image src={painting.imgUrl} />
      <Form
        loading={loading}
        onSubmit={e => handleSubmit(e)}
      >
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
            onChange={e => setPrice(parseInt(e.target.value, 10))}
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
            onChange={e => setHeight(parseInt(e.target.value, 10))}
            placeholder="24"
          />
          <Form.Field
            width="4"
            required

            control="input"
            type="number"
            label="Width in inches"
            onChange={e => setWidth(parseInt(e.target.value, 10))}
            placeholder="36"
          />
          <Form.Field
            width="8"

            control="input"
            type="file"
            label="Replace Existing Photo?"
            onChange={e => setPhoto(e.target.files[0])}
            placeholder="Upload an image"
          />
        </Form.Group>

        <Form.Field
          value={description}
          control="textarea"
          onChange={e => setDescription(e.target.value)}
          required
          label="Painting Description"
          rows={7}
          placeholder="Painting description"
        />

        <Form.Group>
          {painting.isLive ? null : (
            <DeleteButton id={id} type="painting" />
          )}

          <Button type="submit" content="Save" color="purple" width="4" />
        </Form.Group>

      </Form>
    </Container>
  );
}


EditPainting.propTypes = {
  id: PropTypes.number.isRequired,
  painting: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
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
  showError: PropTypes.func.isRequired,
  remove: PropTypes.shape({
    painting: PropTypes.func.isRequired,
  }).isRequired,
};
