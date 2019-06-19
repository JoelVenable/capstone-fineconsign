import React, { Component } from 'react';
// import { Image, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
// import { ArtistProfile } from '../Artists/ArtistProfile';

export class Account extends Component {
  render() {
    return (
      <>
  Hello from Accounts
      </>

    );
  }
}


Account.propTypes = {
  user: PropTypes.shape({
    userType: PropTypes.string.isRequired,
  }).isRequired,
};
