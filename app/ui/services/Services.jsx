import { ipcRenderer } from 'electron';

function doService(command, response, data, cb) {
  ipcRenderer.once(response, (e,d) => {
    if (cb) {
      cb(d);
    }
  });
  ipcRenderer.send(command, data);
}

export default class Services {
  static uploadFile(file, cb) {
    doService('upload-file', 'uploaded-file', file, cb);
  }

  static getAccounts(cb) {
    doService('get-accounts', 'send-accounts', null, cb);
  }

  static addAccount(id, name, cb) {
    doService('add-account', 'added-account', {id, name}, cb);
  }
}
