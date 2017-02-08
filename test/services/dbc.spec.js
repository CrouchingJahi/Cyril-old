import dbc, { Transaction } from '../../app/services/DBC';
import { remote } from 'electron';

describe('The DBC module', () => {
  it('has a path to a folder for data storage', () => {
    expect(remote.app.getPath).toHaveBeenCalled();
    expect(dbc.path).toBe('path/Cyril/cyril.db');
  });

  describe('has a collection for transactions that', () => {
    let collection = dbc.transactions;

    it('exists', () => {
      expect(collection).toBeDefined();
      expect(collection.count()).toBe(0);
    });

    it('can insert or retrieve a transaction', () => {
      let transaction = new Transaction({
        id: 'id',
        name: 'name',
        date: new Date(),
        type: 'type',
        amount: 3.50
      });
      collection.insert(transaction);
      expect(collection.count()).toBe(1);
      var retrieved = collection.findOne();
      expect(retrieved.id).toBe(transaction.id);
      expect(retrieved.name).toBe(transaction.name);
      expect(retrieved.date).toBe(transaction.date);
      expect(retrieved.type).toBe(transaction.type);
      expect(retrieved.amount).toBe(transaction.amount);
    });
  });
});
