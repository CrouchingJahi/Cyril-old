import React from 'react';
import Services from '../services/Services';
import { remote } from 'electron';

export default class AccountSettingsMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      input_add_id: '',
      input_add_name: '',
      input_add_valid: true,
      input_edit_id: '',
      input_edit_name: '',
      input_edit_valid: true,
      editingAccount: null,
      addAccountMenu: false
    };

    this.inputChange = this.inputChange.bind(this);
    this.updateAccounts = this.updateAccounts.bind(this);
    this.addAccount = this.addAccount.bind(this);
    this.editAccount = this.editAccount.bind(this);
    this.deleteAccount = this.deleteAccount.bind(this);
    this.toggleAddMenu = this.toggleAddMenu.bind(this);
  }

  componentDidMount() {
    this.updateAccounts();
  }

  inputChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  updateAccounts() {
    let page = this;
    Services.getAccounts(data => {
      page.setState({accounts: data || []});
    });
  }

  addAccount(e) {
    e.preventDefault();
    if (!this.state.input_add_id) {
      this.setState({input_add_valid: false});
    }
    else {
      Services.addAccount(this.state.input_add_id, this.state.input_add_name);
      this.setState({
        input_add_id: '',
        input_add_name: '',
        input_add_valid: true
      });
      this.updateAccounts();
    }
  }

  editAccount(e) {
    e.preventDefault();
    if (!this.state.input_edit_id) {
      this.setState({input_edit_valid: false});
    }
    else {
      this.setState({
        input_edit_valid: true
      });
      Services.editAccount(this.state.editingAccount.id, this.state.input_edit_id, this.state.input_edit_name, () => {
        this.setState({
          editingAccount: null
        });
        this.updateAccounts();
      });
    }
  }

  deleteAccount(e) {
    e.preventDefault();
    let id = this.state.editingAccount.id;
    remote.dialog.showMessageBox({
      type: "question",
      buttons: ["Delete", "Cancel"],
      title: "Delete Account Data",
      message: "Delete Account Data?",
      detail: "Are you sure you want to delete all data about account " + id + "? This includes all transactions."
    }, (response) => {
      if (response === 0) {
        Services.deleteAccount(id, () => {
          this.setState({
            editingAccount: null
          });
          this.updateAccounts();
        });
      }
    });
  }

  toggleAddMenu(e) {
    e.preventDefault();
    this.setState({
      addAccountMenu: !this.state.addAccountMenu
    });
  }

  toggleEditAccount(e, account) {
    e.preventDefault();
    let selecting = this.state.editingAccount != account;
    this.setState({
      editingAccount: selecting ? account : null,
      input_edit_id: selecting ? account.id : '',
      input_edit_name: selecting ? account.name || '' : '',
      input_edit_valid: true
    });
  }

  render() {
    let accountEditMenu = !this.state.editingAccount ? null : (
      <div>
        <h4>Edit: { this.state.editingAccount.id }</h4>
        ID: <input type="text"
          name="input_edit_id"
          value={this.state.input_edit_id}
          className={this.state.input_edit_valid ? '' : "error"}
          onChange={this.inputChange} />
        Name: <input type="text"
          name="input_edit_name"
          value={this.state.input_edit_name}
          onChange={this.inputChange} />
        <br/>
        <button onClick={this.editAccount}>Edit</button>
        <br/>
        <a href onClick={this.deleteAccount}>Delete</a>
        <br/>
        { this.state.input_edit_valid ? null : <span className="error">You must have an ID for the account. It's also recommended that you have a name.</span> }
      </div>
    );
    let accountsList = this.state.accounts.map((account, id) => {
      return <p key={id}><span>{ account.name || '(unnamed)' }</span> <span className="small">({account.id})</span> - <a href onClick={e => this.toggleEditAccount(e, account)}>Edit</a></p>;
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
        {accountEditMenu}
        <h3><a href onClick={this.toggleAddMenu}>Add Account</a></h3>
        { this.state.addAccountMenu &&
          <form>
            <p>ID: <input type="text"
                     name="input_add_id"
                     value={this.state.input_add_id}
                     className={this.state.input_add_valid ? '' : "error"}
                     onChange={this.inputChange} />
            </p>
            <p>Name: <input type="text"
                       name="input_add_name"
                       value={this.state.input_add_name}
                       onChange={this.inputChange} />
            </p>
            <p><button onClick={this.addAccount}>Add Account</button></p>
          </form>
        }

        { this.state.input_add_valid ? null : <span className="error">You must have an ID for the account. It's also recommended that you have a name.</span> }
      </div>
    );
  }
}
