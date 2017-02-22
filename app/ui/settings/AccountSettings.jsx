import React from 'react';
import Services from '../services/Services';

function AccountDisplay(props) {
  return <p><span>{ props.account.name || '(unnamed)' }</span> ({props.account.id})</p>;
}

export default class AccountSettingsMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      input_id: '',
      input_name: '',
      inputValid: true
    };

    this.inputChange = this.inputChange.bind(this);
    this.updateAccounts = this.updateAccounts.bind(this);
    this.addAccount = this.addAccount.bind(this);
  }

  componentDidMount() {
    this.updateAccounts();
  }

  inputChange(e) {
    let key = `input_${e.target.name}`;
    this.setState({[key]: e.target.value});
  }

  updateAccounts() {
    let page = this;
    Services.getAccounts(data => {
      page.setState({accounts: data || []});
    });
  }

  addAccount(e) {
    e.preventDefault();
    if (!this.state.input_id) {
      this.setState({inputValid: false});
    }
    else {
      Services.addAccount(this.state.input_id, this.state.input_name);
      this.setState({
        input_id: '',
        input_name: '',
        inputValid: true
      });
      this.updateAccounts();
    }
  }

  render() {
    let accountsList = this.state.accounts.map((account, id) => {
      return <AccountDisplay key={id} account={account} />;
    });
    if (!this.state.accounts.length) {
      accountsList = <p>There are currently no accounts.</p>;
    }
    return (
      <div id="settings-account">
        <h2>Account Settings</h2>
        <p>Edit your account information - Add, edit, or remove banking accounts.</p>
        <h3>Current Accounts:</h3>
        {accountsList}
        <h3>Add Account</h3>
        <p>ID: <input type="text"
                 name="id"
                 value={this.state.input_id}
                 className={this.state.inputValid ? '' : "error"}
                 onChange={this.inputChange} />
        </p>
        <p>Name: <input type="text"
                   name="name"
                   value={this.state.input_name}
                   onChange={this.inputChange} />
        </p>
        <p><button onClick={this.addAccount}>Add Account</button></p>
        { this.state.inputValid ? <span></span> : <span className="error">You must have an ID for the account. It's also recommended that you have a name.</span> }
      </div>
    );
  }
}
