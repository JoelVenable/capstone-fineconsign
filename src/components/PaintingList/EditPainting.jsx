import React, { useState } from 'react';
import {
  Input, Form, Button, Image, Grid,
} from 'semantic-ui-react';
import './addPainting.css';
import PropTypes from 'prop-types';
import { compressImage } from '../utility/compressImage';
import { DeleteButton } from '../utility/DeleteButton';
import { DeactivateButton } from '../utility/DeactivateButton';
import { GoLiveButton } from '../utility/GoLiveButton';
// import { GoLiveButton } from '../utility/GoLiveButton';

export function EditPainting({
  user, id, storageRef, artists, edit, history, painting,
}) {
  const [artistId, setArtistId] = useState(painting.artistId);
  const [name, setName] = useState(painting.name);
  const [description, setDescription] = useState(painting.submittedDescription);
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState(painting.currentPrice);
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
      currentPrice: price,
    };
    if (user.userType === 'employee') editedPainting.isReviewed = true;

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
    <Grid stackable>
      <Grid.Column tablet="6">
        <Image src={painting.imgUrl} />
      </Grid.Column>
      <Grid.Column tablet="10">
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
              value={price}
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
              value={height}
              type="number"
              label="Height in inches"
              onChange={e => setHeight(parseInt(e.target.value, 10))}
              placeholder="24"
            />
            <Form.Field
              width="4"
              required
              value={width}
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


          <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            float: 'right',
          }}
          >

            <EditControls user={user} painting={painting} />
          </div>

        </Form>
      </Grid.Column>
    </Grid>
  );
}


function EditControls({ user, painting }) {
  //  If user is artist, they are able to edit only if the painting has not been submitted

  if (user.userType === 'artist') {
    if (!painting.isSubmitted) {
      return (
        <>
          <DeleteButton id={painting.id} type="painting" />
          <Button type="submit" content="Save" color="purple" width="4" />
        </>
      );
    }
    return null;
  }

  if (user.userType === 'employee') {
    if (painting.isSold || painting.isPendingSale) return null;
    if (painting.isLive) {
      return (
        <>
          <DeactivateButton id={painting.id} />
          <Button type="submit" content="Save" color="purple" width="4" />
        </>
      );
    }
    // painting is in "submitted" status.
    return (
      <>
        <Button type="submit" content="Save" color="purple" width="4" />
        <GoLiveButton id={painting.id} />
      </>
    );
  }
  return null;
}


EditControls.propTypes = {
  user: PropTypes.shape({
    userType: PropTypes.string.isRequired,
  }).isRequired,
  painting: PropTypes.shape({
    id: PropTypes.number.isRequired,
    isSubmitted: PropTypes.bool.isRequired,
    isPendingSale: PropTypes.bool.isRequired,
    isSold: PropTypes.bool.isRequired,
    isLive: PropTypes.bool.isRequired,

  }).isRequired,
};


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
};
