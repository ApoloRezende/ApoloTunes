import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBtnD: true,
      inputValue: '',
      loading: false,
      usedTerm: '',
      showResults: false,
      data: [],
    };
    this.valInputSearch = this.valInputSearch.bind(this);
    this.searchAlbums = this.searchAlbums.bind(this);
  }

  valInputSearch({ target: { value } }) {
    this.setState({ inputValue: value }, () => this.valInput());
  }

  valInput() {
    const { inputValue } = this.state;
    const minInput = 2;
    if (inputValue.length >= minInput) {
      this.setState({ searchBtnD: false });
    }
  }

  async searchAlbums() {
    const { inputValue } = this.state;
    this.setState({ loading: true });
    const result = await searchAlbumsAPI(inputValue);
    this.setState({
      inputValue: '',
      loading: false,
      usedTerm: inputValue,
      data: result,
      showResults: true });
  }

  render() {
    const { searchBtnD, inputValue, loading, usedTerm, data, showResults } = this.state;
    return (
      <div data-testid="page-search">
        <p>Pesquisa!</p>
        <Header />
        { loading ? <Loading /> : (
          <div>
            <form>
              <input
                onChange={ this.valInputSearch }
                type="text"
                data-testid="search-artist-input"
                name="inputValue"
                value={ inputValue }
              />
              <button
                data-testid="search-artist-button"
                type="button"
                disabled={ searchBtnD }
                onClick={ this.searchAlbums }
              >
                Pesquisar
              </button>
            </form>
            {showResults
            && (
              <div>
                <p>{`Resultado de álbuns de: ${usedTerm}`}</p>
                {data[0]
                  ? (
                    data.map((element) => (
                      <div key={ element.collectionId }>
                        <Link
                          data-testid={ `link-to-album-${element.collectionId}` }
                          to={ `/album/${element.collectionId}` }
                        >
                          <img
                            src={ element.artworkUrl100 }
                            alt={ element.collectionName }
                          />
                          <h3>{ element.collectionName }</h3>
                          <h4>{ element.artistName }</h4>
                        </Link>
                      </div>
                    )))
                  : (
                    <div>
                      <p>
                        Nenhum álbum foi encontrado
                      </p>
                    </div>
                  )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
