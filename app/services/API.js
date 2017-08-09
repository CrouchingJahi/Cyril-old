import { ipcMain } from 'electron';
import OFXParser from './OFX';
import dbc from './DBC';

export default class API {
  static fileUploadHandler(event, data) {
    OFXParser.parseFile(data, info => {
      let feedback = {
        accountExisted: !!dbc.accounts.findOne({id: info.account}),
        transactionsFound: info.transactions.length,
        duplicatesFound: 0
      };
      let account = dbc.getAccount(info.account);

      info.transactions.forEach(transaction => {
        if (account.transactions.filter(t => t.id == transaction.id).length) {
          feedback.duplicatesFound++;
        }
        else {
          account.transactions.push(transaction);
        }
      });

      event.sender.send('uploaded-file', feedback);
    });
  }

  static addAccountHandler(event, data) {
    let account = dbc.getAccount(data.id);
    account.name = data.name;

    event.sender.send('added-account', account);
  }

  static getAccountsHandler(event) {
    event.sender.send('send-accounts', dbc.getAccounts());
  }

  static deleteAccountHandler(event, id) {
    dbc.accounts.findAndRemove({id});
    event.sender.send('deleted-account');
  }

  static editAccountHandler(event, data) {
    let account = dbc.editAccount(data.old_id, data.new_id, data.new_name);
    event.sender.send('edited-account', account);
  }

  static getMatchersHandler(event) {
    event.sender.send('send-matchers', dbc.getMatchers());
  }

  static start(cb) {
    dbc.initialize().then(() => {
      ipcMain.on('upload-file', API.fileUploadHandler);
      ipcMain.on('add-account', API.addAccountHandler);
      ipcMain.on('get-accounts', API.getAccountsHandler);
      ipcMain.on('delete-account', API.deleteAccountHandler);
      ipcMain.on('edit-account', API.editAccountHandler);
      ipcMain.on('get-matchers', API.getMatchersHandler);
      cb(1);
    }).catch(err => {
      console.log('Database Initialization Error');
      console.log(err);
      cb(0);
    });
  }
}

module.exports = API;
