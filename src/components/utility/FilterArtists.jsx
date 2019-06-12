import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';
import { Consumer } from '../../ContextProvider';


export function FilterArtists({
  setArtist, showOnlyActive, inline, selection, clearable, placeholder,
}) {
  function handleChange(_e, { value: artistId }) {
    setArtist(artistId);
  }
  return (
    <Consumer>
      {({ artists }) => (
        <Dropdown
          placeholder={placeholder}
          inline={inline}
          clearable={clearable}
          onChange={handleChange}
          options={showOnlyActive ? showActive(artists) : showAll(artists)}
        />
      )}
    </Consumer>
  );
}

function showAll(artists) {
  return artists.map(artist => ({
    value: artist.id,
    text: `${artist.firstName} ${artist.lastName}`,
    iamge: { avatar: true, src: artist.artistImageUrl },
  }));
}

function showActive(artists) {
  return artists.filter(artist => artist.paintings.length > 0).map(artist => ({
    value: artist.id,
    text: `${artist.firstName} ${artist.lastName}`,
    iamge: { avatar: true, src: artist.artistImageUrl },

  }));
}


FilterArtists.propTypes = {
  setArtist: PropTypes.func.isRequired,
  showOnlyActive: PropTypes.bool.isRequired,
  inline: PropTypes.bool,
  selection: PropTypes.bool,
  clearable: PropTypes.bool,
  placeholder: PropTypes.string,
};

FilterArtists.defaultProps = {
  inline: true,
  selection: false,
  clearable: true,
  placeholder: null,
};
