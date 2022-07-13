import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loadingHeader: true,
      userName: '',
    };
    this.getUserFunc = this.getUserFunc.bind(this);
  }

  async getUserFunc() {
    const result = await getUser();
    const { name } = result;
    this.setState({ loadingHeader: false, userName: name });
  }

  render() {
    const { loadingHeader, userName } = this.state;
    this.getUserFunc();
    return (
      loadingHeader ? <Loading /> : (
        <div>
          <div data-testid="header-component">
            <p data-testid="header-user-name">
              Olá
              {' '}
              { userName }
            </p>
          </div>
          <nav>
            <Link data-testid="link-to-search" to="/search">Busca</Link>
            <br />
            <Link data-testid="link-to-favorites" to="/favorites">Favoritos</Link>
            <br />
            <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
          </nav>
        </div>
      )
    );
  }
}

export default Header;
