import { ipcMain } from 'electron';
import { MockQFX } from '../data/QFX';
import API from '../../app/services/API';
import dbc, { Account, Transaction } from '../../app/services/DBC';

describe('The API module', () => {
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
    let eventResponse;
    let mockEvent = { sender: {
      send: jest.fn((e, args) => eventResponse = args)
    } };
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
      expect(mockEvent.sender.send).toHaveBeenCalledWith('upload-complete', expectedInfo);
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
});
