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

  static deleteAccount(id, cb) {
    doService('delete-account', 'deleted-account', id, cb);
  }

  static editAccount(old_id, new_id, new_name, cb) {
    doService('edit-account', 'edited-account', {old_id, new_id, new_name}, cb);
  }

  static getMatchers(cb) {
    doService('get-matchers', 'send-matchers', null, cb);
  }

  static getCategorizations(cb) {
    doService('get-cats', 'send-cats', null, cb);
  }
}
