import React, { useState } from 'react';
import {
  Input, Form, Button, Image, Grid, Header,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { compressImage } from '../utility/compressImage';
// import { DeleteButton } from '../utility/DeleteButton';

export function EditArtist({
  // user,
  id,
  storageRef,
  artist,
  edit,
  history,
}) {
  const [firstName, setFirstName] = useState(artist.firstName);
  const [lastName, setLastName] = useState(artist.lastName);
  const [description, setDescription] = useState(artist.artistDescription);
  const [hometown, setHometown] = useState(artist.hometown);
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(artist.phoneNumber);
  if (!artist) {
    return (
      <Header as="h4">Artist not found!</Header>
    );
  }


  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const editedArtist = {
      firstName,
      lastName,
      artistDescription: description,
      hometown,
      phoneNumber,
    };
    if (photo) {
      const mainImg = await compressImage(photo, 'mainImg');
      const thumbImg = await compressImage(photo, 'thumbImg');
      editedArtist.imgUrl = await storageRef.child(`${Date.now()}-${lastName}-main`)
        .put(mainImg)
        .then(response => response.ref.getDownloadURL());
      editedArtist.avatarUrl = await storageRef.child(`${Date.now()}-${lastName}-thumb`)
        .put(thumbImg)
        .then(response => response.ref.getDownloadURL());
    }

    edit.artist(editedArtist, id).then(() =>
      history.goBack());
  }

  return (
    <>


      <Grid stackable>
        <Grid.Column tablet="6">
          <Header>Existing Image</Header>
          <Image fluid src={artist.imgUrl} />
        </Grid.Column>
        <Grid.Column tablet="10">
          <Form
            loading={loading}
            onSubmit={e => handleSubmit(e)}
          >
            <Form.Group>

              <Form.Field
                required
                value={firstName}
                onChange={(_e, { value }) => setFirstName(value)}
                control={Input}
                label="First Name"
                placeholder="John"
                id="firstName"
              />

              <Form.Field
                required
                value={lastName}
                onChange={(_e, { value }) => setLastName(value)}
                control={Input}
                label="Last Name"
                placeholder="Doe"
                id="lastName"
              />
            </Form.Group>

            <Form.Group widths={8}>


              <Form.Field
                width="6"
                required
                value={phoneNumber}
                onChange={(_e, { value }) => setPhoneNumber(value)}
                control={Input}
                label="Phone Number (Only visible to employees)"
                placeholder="123-456-7890"
              />
              <Form.Field
                required
                control={Input}
                type="text"
                label="Hometown"
                value={hometown}
                onChange={(_e, { value }) => setHometown(value)}
                placeholder="Clarksville, TN"
                width="6"
              />
            </Form.Group>

            <Form.Group>
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
              {/* {painting.isLive ? null : (
                <DeleteButton id={id} type="painting" />
              )} */}

              <Button type="submit" content="Save" color="purple" width="4" />
            </Form.Group>

          </Form>
        </Grid.Column>
      </Grid>

    </>
  );
}


EditArtist.propTypes = {
  id: PropTypes.number.isRequired,
  // user: PropTypes.shape({
  //   userType: PropTypes.string.isRequired,
  // }).isRequired,
  storageRef: PropTypes.shape({
    child: PropTypes.func.isRequired,
  }).isRequired,
  artist: PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
  }).isRequired,
  edit: PropTypes.shape({
    painting: PropTypes.func.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
