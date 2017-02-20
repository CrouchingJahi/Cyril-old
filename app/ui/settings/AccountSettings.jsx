import React from 'react';
import Services from '../services/Services';

export default class AccountSettingsMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      inputId: '',
      inputName: '',
      inputValid: true
    };

    this.updateAccounts = this.updateAccounts.bind(this);
    this.addAccount = this.addAccount.bind(this);
    
  }
  
  componentDidMount() {
    this.updateAccounts();
  }
  
  updateAccounts() {
    Services.getAccounts(data => this.setState({accounts: data}));
  }

  addAccount() {
    if (!this.state.inputId) {
      this.setState({inputValid: false});
    }
    else {
      Services.addAccount(this.state.inputId, this.state.inputName);
      this.setState({
        inputId: '',
        inputName: '',
        inputValid: true
      });
      this.updateAccounts();
    }
  }

  render() {
    return (
      <div id="settings-account">
        <h2>Account Settings</h2>
        <p>Edit your account information - Add, edit, or remove banking accounts.</p>
        <h3>Current Accounts:</h3>
        {
          this.state.accounts.length > 0 ?
          <ul>
            this.state.accounts.map(element => {
              <li>element.name</li>
            })
          </ul>
          :
          <p>There are currently no accounts.</p>
        }
        <h3>Add Account</h3>
        <form name="addAccount">
          <p>ID: <input type="text"></input></p>
          <p>Name: <input type="text"></input></p>
          <p><button onClick={this.addAccount}>Add Account</button></p>
        </form>
      </div>
    );
  }
}
