import React from 'react';
import Link from '../router/Link';
import { remote, shell } from 'electron';

export default class SplashScreen extends React.Component {
  render() {
    const version = remote.app.getVersion();
    function openGitHub (e) {
      e.preventDefault();
      shell.openExternal('https://github.com/CrouchingJahi/Cyril/');
    }

    return (
      <div id="splash">
        <h1>Cyril</h1>
        <p>Version { version }</p>
        <img className="splash-logo" src="images/Cyril.png" />
        <p>by Jahi Crouch</p>
        <p><a href onClick={ openGitHub }>GitHub Page</a></p>
      </div>
    );
  }
}
// <p><Link state="menu">Continue</Link></p>
