import DBC, { Transaction } from '../../app/services/DBC';
import { app } from 'electron';

describe('The DBC module', () => {
  let db = new DBC();
  it('has a path to a folder for data storage', () => {
    expect(app.getPath).toHaveBeenCalled();
    expect(db.path).toBe('path/cyril/cyril.db');
  });

  describe('has a collection for transactions that', () => {
    let collection = db.transactions;

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
