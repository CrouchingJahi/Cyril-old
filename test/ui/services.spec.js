import { ipcRenderer } from 'electron';
import Services from '../../app/ui/services/Services.jsx';

describe('the services module', () => {
  it('getAccounts() uses callback if defined', (done) => {
    Services.getAccounts(() => {
      done();
    });
  });

  it('addAccount() adds an account', (done) => {
    let expectedId = 'unit';
    let expectedName = 'test';
    Services.addAccount(expectedId, expectedName, () => {
      done();
    });
    expect(ipcRenderer.send).toHaveBeenCalledWith('add-account', {id: expectedId, name: expectedName});
  });

  it('uploadFile() uses callback', (done) => {
    Services.uploadFile('', () => {
      done();
    });
  });

  it('uploadFile() still runs if no callback is defined', () => {
    Services.uploadFile('');
  });

  it('deleteAccount()', (done) => {
    let id = 'unit-services-deleteAccount';
    Services.deleteAccount(id, () => {
      done();
    });
  });

  it('editAccount()', (done) => {
     Services.editAccount('oldid', 'newid', 'newname', () => {
       done();
     });
  });

  it('getMatchers()', (done) => {
    Services.getMatchers(() => {
      done();
    });
  });

  it('getCategorizations()', (done) => {
    Services.getCategorizations(() => {
      done();
    });
  });
});
