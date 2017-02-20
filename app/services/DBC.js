import Loki from 'lokijs';
import { app } from 'electron';
import path from 'path';
import lokiCryptedFileAdapter from 'lokijs/src/loki-crypted-file-adapter';

export class Account {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.transactions = [];
  }
}

export class Transaction {
  constructor(properties) {
    this.id = properties.id; // string
    this.name = properties.name; // string
    this.memo = properties.memo; // string
    this.date = properties.date; // date
    this.type = properties.type; // string
    this.amount = properties.amount; // float
    this.category = properties.category; // object (category type)
  }
}

class DBC {
  constructor(options={}) {
    this.path = path.join(app.getPath('appData'), 'Cyril', 'cyril.db');
    lokiCryptedFileAdapter.setSecret(this.path);
    let lokiOptions = Object.assign({
      adapter: lokiCryptedFileAdapter,
      autosave: true
    }, options);
    this.data = new Loki(this.path, lokiOptions);
  }
  
  initialize() {
    let dbc = this;
    let collOpts = {
      unique: ['id'],
      indices: ['id']
    };
    let resolvePromise = function (resolve) {
      dbc.accounts = dbc.findCollection('accounts', collOpts);
      resolve();
    }
    return new Promise((resolve, reject) => {
      dbc.data.loadDatabase({}, (err) => {
        if (err) {
          if (err.code == 'ENOENT') {
            resolvePromise(resolve);
          }
          else {
            reject(err);
          }
        }
        else {
          resolvePromise(resolve);
        }
      });
    });
  }

  findCollection(name, opts) {
    return this.data.getCollection(name) || this.data.addCollection(name, opts);
  }

  getAccount(id) {
    return this.accounts.findOne({id: id}) || this.accounts.insert(new Account(id));
  }

  getAccounts() {
    return this.accounts.find();
  }

}

let instance = new DBC();
export default instance;
