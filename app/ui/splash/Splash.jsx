import React from 'react';
import Link from '../router/Link';
import { remote, shell } from 'electron';

export default class SplashScreen extends React.Component {
  openGitHub(e) {
    e.preventDefault();
    shell.openExternal('https://github.com/CrouchingJahi/Cyril/');
  }

  version() {
    return remote.app.getVersion();
  }

  render() {
    return (
      <div id="splash">
        <h1>Cyril</h1>
        <p>Version { this.version() }</p>
        <img className="splash-logo" src="images/Cyril.png" />
        <p>by Jahi Crouch</p>
        <p><a href onClick={ this.openGitHub }>GitHub Page</a></p>
        <p><Link state="menu">Continue</Link></p>
      </div>
    );
  }
}
