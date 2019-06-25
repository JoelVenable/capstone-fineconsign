import React from 'react';
import { Button, Icon, Popup } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export function EditButton({ id, history }) {
  return (
    <Popup
      content="Edit this painting"
      trigger={(
        <Button icon>
          <Icon name="edit" onClick={() => history.push(`/paintings/${id}/edit`)} />
        </Button>
)}
    />
  );
}


EditButton.propTypes = {
  id: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
