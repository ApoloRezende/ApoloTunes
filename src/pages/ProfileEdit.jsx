import React from 'react';
import Header from '../components/Header';

export default class Profile extends React.Component {
  render() {
    return (
      <div data-testid="page-profile-edit">
        <p>Profile!</p>
        <Header />
      </div>
    );
  }
}
