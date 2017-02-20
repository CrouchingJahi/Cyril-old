import { ipcRenderer } from 'electron';

export default class Services {
  static getAccounts(cb) {
    ipcRenderer.once('send-accounts', (e,d) => {
      cb(d || []);
    });
    ipcRenderer.send('get-accounts');
  }
  
  static addAccount(id, name, cb) {
    ipcRenderer.once('added-account', (e,d) => {
      if (cb) {
        cb(d);
      }
    });
    ipcRenderer.send('add-account', { id, name });
  }
}
