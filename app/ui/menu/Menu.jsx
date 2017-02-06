import React from 'react';
import Link from '../router/Link';

export default class MenuScreen extends React.Component {
  render() {
    return (
      <div id="menu">
        <h2>Menu</h2>
        <p><Link state="spending">Spending</Link></p>
        <p><Link state="upload">Upload</Link></p>
        <p><Link state="settings">Settings</Link></p>
      </div>
    );
  }
}
