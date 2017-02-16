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

      event.sender.send('upload-complete', feedback);
    });
  }

  static start(cb) {
    dbc.initialize().then(() => {
      ipcMain.on('file-upload', API.fileUploadHandler);
      cb(1);
    });
  }
}

module.exports = API;
