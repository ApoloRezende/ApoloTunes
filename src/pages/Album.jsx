import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

export default class Album extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      name: '',
      album: '',
      data: [],
      fav: [],
      imgA: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    try {
      const result = await getMusics(id);
      const resultSongs = result.slice(1);
      const { artworkUrl100, artistName, collectionCensoredName } = result[1];
      this.setState({
        imgA: artworkUrl100,
        name: artistName,
        album: collectionCensoredName,
        data: resultSongs,
      });
    } catch (error) {
      console.log(error);
    }
    this.valChecked();
  }

  handleChange({ target: { value, checked } }) {
    const { data } = this.state;
    const id = parseInt(value, 10);
    const music = data.find((e) => e.trackId === id);
    this.setState({ loading: true }, async () => {
      if (checked) {
        await addSong(music);
      } else {
        await removeSong(music);
      }
      const favorite = await getFavoriteSongs();
      this.setState({ fav: favorite, loading: false });
    });
  }

  async valChecked() {
    const favorite = await getFavoriteSongs();
    this.setState({
      fav: favorite,
    });
  }

  render() {
    const { name, album, data, fav, loading, imgA } = this.state;
    console.log(data);
    return (
      <div>
        <Header />
        { loading ? <Loading /> : (
          <div data-testid="page-album">
            <p>Album!</p>
            <img src={ imgA } alt="" />
            <h3 data-testid="artist-name">
              Artist Name:
              {' '}
              { name }
            </h3>
            <h2 data-testid="album-name">
              Collection Name:
              {' '}
              { album }
            </h2>
            {data.map((element, index) => (
              <MusicCard
                key={ index }
                trackName={ element.trackName }
                previewUrl={ element.previewUrl }
                trackId={ element.trackId }
                checked={ fav !== null && fav.some((e) => e.trackId === element.trackId) }
                handleChange={ this.handleChange }
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
