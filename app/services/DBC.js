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
    this.category = properties.category; // Category
  }
}

export class Category {
  constructor(group, category, subcategory) {
    this.group = group;
    this.category = category;
    this.subcategory = subcategory;
  }
}

export class Matcher {
  constructor(regex, category) {
    this.id = regex.toString();
    this.regex = regex;
    this.category = category;
  }
}

class DBC {
  /* istanbul ignore next */
  constructor(options={}) {
    // path = '/Users/jcrouch/Library/Application Support/Cyril/cyril.db'
    this.path = app ? path.join(app.getPath('appData'), 'Cyril', 'cyril.db') : '';
    this.options = options;
  }

  initialize() {
    lokiCryptedFileAdapter.setSecret(this.path);
    let dbOptions = Object.assign({
      adapter: lokiCryptedFileAdapter,
      autosave: true,
      autosaveInterval: 5000
    }, this.options);

    this.data = new Loki(this.path, dbOptions);

    let dbc = this;
    let collOpts = {
      unique: ['id'],
      indices: ['id']
    };
    let resolvePromise = function (resolve) {
      dbc.accounts = dbc.findCollection('accounts', collOpts);
      dbc.matchers = dbc.findCollection('matchers', collOpts);
      resolve();
    };
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

  editAccount(old_id, new_id, new_name) {
    var account = this.accounts.findOne({id: old_id});
    account.id = new_id;
    account.name = new_name;
    this.accounts.update(account);
    return account;
  }

  getMatchers() {
    return this.matchers.find();
  }

  getCategorizations() {
    return this.matchers.mapReduce(matcher => matcher.category, (categories) => {
      return categories.reduce((acc, value) => {
        if (!!value.group) {
          acc[value.group] = acc[value.group] || {};
          if (!!value.category) {
            acc[value.group][value.category] = acc[value.group][value.category] || {};
            if (!!value.subcategory) {
              acc[value.group][value.category][value.subcategory] = null;
            }
          }
        }
        return acc;
      }, {});
    });
  }
}

let instance = new DBC();
export default instance;
