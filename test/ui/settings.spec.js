import React from 'react';
import { shallow, mount } from 'enzyme';
import { ipcRenderer } from 'electron';

import { Account } from '../../app/services/DBC';
import SettingsScreen from '../../app/ui/settings/Settings.jsx';
import CategoriesSettingsMenu from '../../app/ui/settings/CategoriesSettings.jsx';
import AccountSettingsMenu from '../../app/ui/settings/AccountSettings.jsx';

describe('The settings screen', () => {
  const component = mount(<SettingsScreen />);

  it('renders a link for each menu', () => {
    var links = component.html().match(/<a[^>]+>\w+<\/a>/g).map(link => link.match(/>(\w+)</)[1]);
    var menus = Object.keys(component.getNode().menus);
    expect(links).toEqual(menus);
  });
  
  it('renders the selected menu into its page depending on state', () => {
    let submenu = () => component.html().match(/<hr>(.+)<\/div>/)[1];
    component.setState({selected: ''});
    expect(submenu()).toEqual('<div></div>');
    component.setState({selected: 'Categories'});
    let categoriesComponent = shallow(<CategoriesSettingsMenu />)
    expect(submenu()).toEqual(categoriesComponent.html());
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
  
  describe('AccountSettings submenu', () => {
    const submenu = mount(<AccountSettingsMenu />);
    it('renders', () => {
      expect(submenu.html()).toBeDefined();
    });
    
    it('renders when accounts exist', () => {
      let mockAccounts = [
        new Account('id', 'name'),
        new Account('id2')
      ];
      submenu.setState({accounts: mockAccounts});
      expect(submenu.html()).toBeDefined();
    });
    
    it('inputChange changes state to update text fields', () => {
      submenu.getNode().inputChange({target: { name: 'id', value: 'test' }});
      expect(submenu.state().input_id).toBe('test');
    });
    
    describe('addAccount method', () => {
      let e = { preventDefault: jest.genMockFunction() };
      it('shows an error if no text was given for the account ID', () => {
        submenu.setState({input_id: '', input_name: ''})
        submenu.getNode().addAccount(e);
        expect(submenu.state().inputValid).toBeFalsy();
      });
      
      it('adds to database if an account ID is given', () => {
        submenu.setState({input_id: 'test', input_name: 'account'});
        submenu.getNode().addAccount(e);
        expect(submenu.state().inputValid).toBeTruthy();
        expect(ipcRenderer.send).toHaveBeenCalledWith('add-account', {id: 'test', name: 'account'});
      });
    });
  });
});
