import Loki from 'lokijs';
import { remote } from 'electron';
import path from 'path';
import lokiCryptedFileAdapter from 'lokijs/src/loki-crypted-file-adapter';

export class Account {
  constructor(id) {
    this.id = id;
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
  constructor(options) {
    let lokiOptions = Object.assign({
      adapter: lokiCryptedFileAdapter
    }, options);
    this.path = path.join(remote.app.getPath('appData'), 'Cyril', 'cyril.db');
    this.data = new Loki(this.path, lokiOptions);

    this.accounts = this.findCollection('accounts');
    this.transactions = this.findCollection('transactions');
  }

  findCollection(name) {
    return this.data.getCollection(name) || this.data.addCollection(name);
  }

  getAccounts() {
    return [];
  }

}

let instance = new DBC();
export default instance;
