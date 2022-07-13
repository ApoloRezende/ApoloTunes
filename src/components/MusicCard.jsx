import React from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends React.Component {
  render() {
    const { trackName, previewUrl, trackId, handleChange, checked } = this.props;
    return (
      <div>
        <div>
          <h2>{trackName}</h2>
          <audio
            data-testid="audio-component"
            src={ previewUrl }
            controls
          >
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
          </audio>
          <label htmlFor="favorite">
            <input
              checked={ checked }
              type="checkbox"
              id="favorite"
              data-testid={ `checkbox-music-${trackId}` }
              onChange={ handleChange }
              value={ trackId }
            />
            Favorita
          </label>
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string,
  trackName: PropTypes.string,
  trackId: PropTypes.string,
}.isRequired;
