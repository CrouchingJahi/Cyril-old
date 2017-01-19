import Loki from 'lokijs';
import { app } from 'electron';
import path from 'path';
import lokiCryptedFileAdapter from 'lokijs/src/loki-crypted-file-adapter';

export class Transaction {
  constructor(properties) {
    this.id = properties.id; // string
    this.name = properties.name; // string
    this.date = properties.date; // date
    this.type = properties.type; // string
    this.amount = properties.amount; // float
    this.category = properties.category; // object (category tyoe)
  }
}

export default class DBC {
  findCollection(name) {
    return this.data.getCollection(name) || this.data.addCollection(name);
  }

  constructor(options) {
    let lokiOptions = Object.assign({
      adapter: lokiCryptedFileAdapter
    }, options);
    this.path = path.join(app.getPath('appData'), 'cyril', 'cyril.db');
    this.data = new Loki(this.path, lokiOptions);

    this.transactions = this.findCollection('transactions');
  }

};

module.exports = DBC;
module.exports.Transaction = Transaction;
