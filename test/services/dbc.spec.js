import dbc, { Account, Transaction, Category, Matcher } from '../../app/services/DBC';
import { app } from 'electron';
import { Matchers } from '../data/Matchers';
import Loki from 'lokijs';

describe('The DBC module', () => {
  beforeAll(() => {
    return dbc.initialize();
  });

  it('has a path to a folder for data storage', () => {
    expect(dbc.path).toBe('path/Cyril/cyril.db');
  });

  describe('init function', () => {
    it('continues anyway if an ENOENT error happens', (done) => {
      var lokiProxy = Proxy.revocable(Loki.prototype, {});
      lokiProxy.proxy.loadDatabase = function (opts, cb) {
        cb({
          code: 'ENOENT',
          message: 'unit test mock error'
        });
      };
      dbc.initialize().then(() => {
        done();
      });
      lokiProxy.revoke();
    });
    it('rejects its promise gracefully if an error happens', (done) => {
      var lokiProxy = Proxy.revocable(Loki.prototype, {});
      lokiProxy.proxy.loadDatabase = function (opts, cb) {
        cb(new Error('unit test mock error'));
      }
      dbc.initialize().catch(err => {
        done();
      });
      lokiProxy.revoke();
    });
  });

  describe('keeps collections', () => {
    it('for accounts', () => {
      expect(dbc.accounts).toBeDefined();
      let account = new Account('id');
      expect(account.id).toEqual('id');
      expect(account.transactions).toEqual([]);
      dbc.accounts.insert(account);
      expect(dbc.accounts.count()).toBe(1);
      var retrieved = dbc.accounts.findOne();
      expect(retrieved.id).toBe(account.id);
      expect(retrieved.transactions).toBe(account.transactions);
    });
    it('for matchers', () => {
      expect(dbc.matchers).toBeDefined();
      let category = new Category('test', 'unit', 'dbc');
      let matcher = new Matcher(/test/, category);
      dbc.matchers.insert(matcher);
      expect(dbc.matchers.find().length).toBe(1);
    });
  });

  describe('getAccounts function', () => {
    beforeEach(() => dbc.accounts.clear());
    it('returns an empty list if the database has no accounts', () => {
      expect(dbc.getAccounts()).toEqual([]);
    });
    it('returns a list of any accounts already stored in the database', () => {
      dbc.accounts.insert(new Account('id1'));
      dbc.accounts.insert(new Account('id2'));
      dbc.accounts.insert(new Account('id3'));
      expect(dbc.getAccounts().length).toBe(3);
    });
  });

  describe('getAccount function', () => {
    beforeEach(() => dbc.accounts.clear());
    it('returns the specified account by id', () => {
      let id = 'unit-dbc-getAccount';
      let account = new Account(id);
      account.transactions.push(new Transaction({id: '1234'}));
      dbc.accounts.insert(account);
      let retrievedAccount = dbc.getAccount(id);
      expect(retrievedAccount.id).toBe(id);
      expect(retrievedAccount.transactions.length).toEqual(1);
      expect(retrievedAccount.transactions[0].id).toEqual('1234');
    });
    it('returns a new account with the specified id if none already exists', () => {
      expect(dbc.accounts.find().length).toBe(0);
      let account = dbc.getAccount('bleh');
      expect(dbc.accounts.find().length).toBe(1);
    });
  });

  describe('editAccount function', () => {
    beforeEach(() => dbc.accounts.clear());
    it('changes the name and id of the specified account', () => {
      let newId = 'unit-dbc-editAccount';
      let newName = 'Edit Account';
      let account = new Account('old-id');
      let expectedAccount = new Account(newId, newName);
      let transactions = [
        new Transaction({id: 't1'}),
        new Transaction({id: 't2'}),
        new Transaction({id: 't3'})
      ];
      transactions.forEach(t => {
        account.transactions.push(t);
        expectedAccount.transactions.push(t);
      });
      dbc.accounts.insert(account);
      dbc.editAccount(account.id, newId, newName);
      expect(dbc.accounts.find({id: newId})).toEqual([expect.objectContaining(expectedAccount)]);
    });
  });

  describe('getMatchers function', () => {
    beforeEach(() => dbc.matchers.clear());
    it('returns an empty list if the database has no matchers', () => {
      expect(dbc.getMatchers()).toEqual([]);
    });
    it('returns a list of any matchers already stored in the database', () => {
      dbc.matchers.insert(new Account('id1'));
      dbc.matchers.insert(new Account('id2'));
      dbc.matchers.insert(new Account('id3'));
      expect(dbc.getMatchers().length).toBe(3);
    });
  });

  describe('getCategorizations function', () => {
    beforeEach(() => dbc.matchers.clear());
    it('when no matchers are found, doesn\'t blow up', () => {
      expect(dbc.getCategorizations()).toEqual({});
    });
    it('automatically populates data from the stored matchers', () => {
      dbc.matchers.insert(Matchers);
      let expectedState = {
        color: {
          cool: {
            blue: null,
            purple: null,
            green: null
          },
          neutral: {
            brown: null
          },
          warm: {
            red: null,
            yellow: null
          }
        },
        food: {}
      };
      expect(dbc.getCategorizations()).toEqual(expectedState);
    });
  });
});
