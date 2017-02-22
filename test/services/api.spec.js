import { ipcMain } from 'electron';
import { MockQFX } from '../data/QFX';
import API from '../../app/services/API';
import dbc, { Account, Transaction } from '../../app/services/DBC';

describe('The API module', () => {
  let eventResponse;
  let mockEvent = { sender: {
    send: jest.fn((e, args) => eventResponse = args)
  } };

  beforeAll(() => {
    return dbc.initialize();
  });
  
  it('has a start method to activate endpoints', (done) => {
    API.start(() => {
      expect(ipcMain.on).toHaveBeenCalled();
      done();
    });
  });
  
  describe('fileUploadHandler function', () => {
    beforeEach(() => {
      eventResponse = null;
      dbc.accounts.clear();
      dbc.accounts.constraints.unique.id.clear();
    });
    it('sends back information about the file that was processed', () => {
      let expectedInfo = {
        accountExisted: false,
        duplicatesFound: 0,
        transactionsFound: 3
      };
      API.fileUploadHandler(mockEvent, MockQFX);
      expect(mockEvent.sender.send).toHaveBeenCalledWith('uploaded-file', expectedInfo);
    });
    it('saves the account to the database if it doesnt already exist', () => {
      expect(dbc.accounts.find().length).toBe(0);
      API.fileUploadHandler(mockEvent, MockQFX);
      expect(dbc.accounts.find().length).toBe(1);
      var account = dbc.accounts.findOne();
      expect(account.id).toBe('unittest');
      expect(account.transactions.length).toBe(3);
    });
    it('updates the existing account if it is in the database', () => {
      dbc.accounts.insert(new Account('unittest'));
      expect(dbc.accounts.find().length).toBe(1);
      let acct = dbc.accounts.findOne();
      expect(acct.transactions.length).toBe(0);
      API.fileUploadHandler(mockEvent, MockQFX);
      expect(acct.transactions.length).toBe(3);
    });
    it('does not overwrite already existing transactions', () => {
      let account = dbc.accounts.insert(new Account('unittest'));
      account.transactions.push(new Transaction({
        id: '20161104000837429344',
        name: 'THE HOME DEPOT #3831 DUBLIN OH',
        memo: '24610436307010187494585; 05200; ;',
        date: new Date('2016-11-3 12:00:00'),
        type: 'DEBIT',
        amount: 4.91
      }));
      API.fileUploadHandler(mockEvent, MockQFX);
      expect(dbc.accounts.findOne().transactions.length).toBe(3);
      expect(eventResponse.transactionsFound).toBe(3);
      expect(eventResponse.duplicatesFound).toBe(1);
      expect(eventResponse.accountExisted).toBe(true);
    });
  });

  describe('addAccountHandler function', () => {

    beforeEach(() => {
      eventResponse = null;
      dbc.accounts.clear();
      dbc.accounts.constraints.unique.id.clear();
    });

    it('sends a reference to the newly created account', () => {
      let mockData = {
        id: 'test-account',
        name: 'unittest'
      };
      API.addAccountHandler(mockEvent, mockData);

      expect(eventResponse.id).toEqual(mockData.id);
      expect(eventResponse.name).toEqual(mockData.name);
    });
    it('if the account already exists, renames it', () => {
      let mockData = {
        id: 'test-account',
        name: 'unittest'
      };
      let acct = new Account(mockData.id, 'blah');
      acct.transactions.push(new Transaction({id: 'one'}));
      acct.transactions.push(new Transaction({id: 'two'}));
      acct.transactions.push(new Transaction({id: 'three'}));
      dbc.accounts.insert(acct);

      API.addAccountHandler(mockEvent, mockData);

      expect(eventResponse.id).toEqual(mockData.id);
      expect(eventResponse.name).toEqual(mockData.name);
      expect(eventResponse.transactions.length).toEqual(3);
    });

    describe('getAccountsHandler function', () => {
      it('returns the list of stored accounts', () => {
        dbc.accounts.insert(new Account('unittest'));
        API.getAccountsHandler(mockEvent);
        expect(eventResponse.length).toBe(1);
      });
    });
  });
});
