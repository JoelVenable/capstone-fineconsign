

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

export function EditArtistButton({ id, push, text }) {
  return (
    <Button style={{ marginBottom: '1rem' }} onClick={() => push(`/artists/${id}/edit`)}>
      {text}
    </Button>
  );
}


EditArtistButton.propTypes = {
  id: PropTypes.number.isRequired,
  push: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};
