import React from 'react';
import Link from '../router/Link';

import AccountSettingsMenu from './AccountSettings';
import CategoriesSettingsMenu from './CategoriesSettings';

export default class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.menus = {
      Account: AccountSettingsMenu,
      Categories: CategoriesSettingsMenu,
    };
    this.state = {
      selected: ''
    };

    this.showMenu = this.showMenu.bind(this);
  }

  showMenu(e) {
    e.preventDefault();
    this.setState({selected: e.target.innerText});
  }

  render() {
    var links = Object.keys(this.menus).map(menu => {
      return <p key={menu}><a className="blah" href onClick={this.showMenu}>{menu}</a></p>
    });
    var Submenu = this.menus[this.state.selected] || 'div';
    return (
      <div id="settings">
        <p><Link state="menu">&#8249; Back to Menu</Link></p>
        <h2>Settings</h2>
        { links }
        <hr/>
        <Submenu />
      </div>
    );
  }
}
