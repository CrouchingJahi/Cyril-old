import React from 'react';
import { shallow, mount } from 'enzyme';
import { ipcRenderer, remote } from 'electron';

import { Account } from '../../app/services/DBC';
import Services from'../../app/ui/services/Services';
import SettingsScreen from '../../app/ui/settings/Settings.jsx';
import CategoriesSettingsMenu from '../../app/ui/settings/CategoriesSettings.jsx';
import AccountSettingsMenu from '../../app/ui/settings/AccountSettings.jsx';

describe('The settings screen', () => {
  const component = mount(<SettingsScreen />);

  describe('renders', () => {
    it('a link for each menu', () => {
      var links = component.html().match(/<a[^>]+>\w+<\/a>/g).map(link => link.match(/>(\w+)</)[1]);
      var menus = Object.keys(component.getNode().menus);
      expect(links).toEqual(menus);
    });

    it('the selected menu into its page depending on state', () => {
      let submenu = () => component.html().match(/<hr>(.+)<\/div>/)[1];
      component.setState({selected: ''});
      expect(submenu()).toEqual('<div></div>');
      component.setState({selected: 'Categories'});
      let categoriesComponent = shallow(<CategoriesSettingsMenu />)
      expect(submenu()).toEqual(categoriesComponent.html());
    });
  });

  it('showMenu() changes which menu is selected', () => {
    let expectedState = 'test';
    let fakeEvent = {
      preventDefault: jest.genMockFunction(),
      target: { innerText: expectedState}
    };
    component.getNode().showMenu(fakeEvent);
    expect(component.state().selected).toBe(expectedState);
  });

});

describe('The account settings submenu', () => {
  const submenu = mount(<AccountSettingsMenu />);

  describe('renders', () => {
    it('when accounts exist', () => {
      let mockAccounts = [
        new Account('id', 'name'),
        new Account('id2')
      ];
      submenu.setState({accounts: mockAccounts});
      expect(submenu.html()).toBeDefined();
    });

    it('a menu to edit an account if it\'s selected', () => {
      let account = new Account('unit-test', 'name');
      submenu.setState({accounts: [account], editingAccount: account});
      expect(submenu.html()).toEqual(expect.stringMatching(/Edit: .+unit-test/));
    });

    it('with an onclick on each account for editing', () => {
      let account = new Account('unit-test', 'name');
      submenu.setState({accounts: [account], editingAccount: null});
      submenu.find('a').findWhere(n => n.text() == 'Edit').simulate('click');
      expect(submenu.state().editingAccount).toBe(account);
    });
    
    it('with a delete button click function', () => {
      submenu.find('a').findWhere(n => n.text() == 'Delete').simulate('click');
    });
  });

  it('inputChange changes state to update text fields', () => {
    let expectedText = 'test';
    submenu.getNode().inputChange({target: { name: 'input_add_id', value: expectedText }});
    expect(submenu.state().input_add_id).toBe(expectedText);
  });

  describe('addAccount method', () => {
    let e = { preventDefault: jest.genMockFunction() };
    it('shows an error if no text was given for the account ID', () => {
      submenu.setState({input_add_id: '', input_add_name: '', addAccountMenu: true});
      submenu.getNode().addAccount(e);
      expect(submenu.state().input_add_valid).toBeFalsy();
    });

    it('adds to database if an account ID is given', () => {
      submenu.setState({input_add_id: 'test', input_add_name: 'account'});
      submenu.getNode().addAccount(e);
      expect(submenu.state().input_add_valid).toBeTruthy();
      expect(ipcRenderer.send).toHaveBeenCalledWith('add-account', {id: 'test', name: 'account'});
    });
  });

  describe('toggleEditAccount method', () => {
    let e = { preventDefault: jest.genMockFunction() };

    it('shows an edit menu for the chosen account', () => {
      let acct = new Account('bla');
      submenu.getNode().toggleEditAccount(e, acct);
      expect(submenu.state().editingAccount).toBe(acct);
    });

    it('hides menu if the same account is selected', () => {
      let acct = new Account('bla');
      submenu.setState({editingAccount: acct});
      submenu.getNode().toggleEditAccount(e, acct);
      expect(submenu.state().editingAccount).toBeNull();
    });
  });

  describe('toggleAddMenu method', () => {
    let e = { preventDefault: jest.genMockFunction() };
    it('shows an edit menu for the chosen account', () => {
      submenu.getNode().toggleAddMenu(e);
    });
  });

  describe('editAccount method', () => {
    let fakeEvent = { preventDefault: jest.genMockFunction() };

    it('displays an error if no id is supplied', () => {
      let id = '';
      let name = 'blah';
      let acct = new Account('foo', 'bar');
      submenu.setState({
        editingAccount: acct,
        input_edit_id: id,
        input_edit_name: name
      });

      submenu.getNode().editAccount(fakeEvent);
      expect(submenu.state().input_edit_valid).toBeFalsy();
    });

    it('changes the id/name of the chosen account', () => {
      let id = 'unit-settings-editAccount';
      let name = 'blah';
      let acct = new Account('foo', 'bar');
      submenu.setState({
        editingAccount: acct,
        input_edit_id: id,
        input_edit_name: name
      });

      Services.editAccount = jest.fn((id1, id2, n, cb) => {
        cb();
      });
      submenu.getNode().editAccount(fakeEvent);
      expect(Services.editAccount).toHaveBeenCalledWith(acct.id, id, name, expect.any(Function));
    });
  });

  describe('deleteAccount method', () => {
    let fakeEvent = { preventDefault: jest.genMockFunction() };

    it('does nothing if the modal response was to cancel', () => {
      let acct = new Account('unit-settings-deleteAccount');
      submenu.setState({editingAccount: acct});
      remote.dialog.showMessageBox = jest.fn((obj, cb) => {
        cb(1);
      });
      submenu.getNode().deleteAccount(fakeEvent, acct);
      expect(submenu.state().editingAccount).toBe(acct);
    });

    it('deletes account if modal response was to confirm', () => {
      let acct = new Account('unit-settings-deleteAccount');
      submenu.setState({editingAccount: acct});
      remote.dialog.showMessageBox = jest.fn((obj, cb) => {
        cb(0);
      });
      submenu.getNode().deleteAccount(fakeEvent);
      expect(submenu.state().editingAccount).toBeNull();
    });
  });
});
