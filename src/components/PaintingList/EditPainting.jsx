import React, { useState } from 'react';
import {
  Input, TextArea, Form, Button, Message, Container,
} from 'semantic-ui-react';
import './addPainting.css';
import PropTypes from 'prop-types';
import { compressImage } from '../utility/compressImage';

export function EditPainting({
  user, id, storageRef, artists, edit, history, painting, showError,
}) {
  const [error, setError] = useState({
    isVisible: true,
    header: 'Painting not found!',
    content: <Button>Go back...</Button>,
  });


  //  Set Error condition if painting not found
  // if (painting === undefined) {
  //   painting = {
  //     artistId: NaN,
  //     name: '',
  //     description: '',
  //     originalPrice: NaN,
  //     medium: '',
  //     height: NaN,
  //     width: NaN,
  //   };
  // }

  const [artistId, setArtistId] = useState(painting.artistId);
  const [name, setName] = useState(painting.name);
  const [description, setDescription] = useState(painting.description);
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState(painting.originalPrice);
  const [medium, setMedium] = useState(painting.medium);
  const [height, setHeight] = useState(painting.height);
  const [width, setWidth] = useState(painting.width);


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
    <Container>
      <Form error={error.isVisble} loading={loading} onSubmit={e => handleSubmit(e, storageRef)}>
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
        <Message
          error
          header={error.header}
          content={error.content}
        />
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
};
