import React from 'react';
// import { Image, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
// import { ArtistProfile } from '../Artists/ArtistProfile';

export function Account({ user }) {
  return (
    <>
  Hello from Accounts
  Usertype:
      {' '}
      {user.userType}
    </>

  );
}


Account.propTypes = {
  user: PropTypes.shape({
    userType: PropTypes.string.isRequired,
  }).isRequired,
};
