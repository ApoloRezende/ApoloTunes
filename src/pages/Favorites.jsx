import React from 'react';
import Header from '../components/Header';

export default class Favorites extends React.Component {
  render() {
    return (
      <div data-testid="page-favorites">
        <p>Favoritas!</p>
        <Header />
      </div>
    );
  }
}
