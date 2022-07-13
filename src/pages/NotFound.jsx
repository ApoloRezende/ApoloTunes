import React from 'react';
import Header from '../components/Header';

export default class NotFound extends React.Component {
  render() {
    return (
      <div data-testid="page-not-found">
        <p>NOT FOUND!</p>
        <Header />
      </div>
    );
  }
}
