import React from 'react';
import { mount } from 'enzyme';

import MenuScreen from '../../app/ui/menu/Menu.jsx';
import { shell } from 'electron';

describe('The main menu screen', () => {
  const component = mount(<MenuScreen />);

  it('renders', () => {
    expect(component).toBeDefined();
    expect(component.html()).toBeDefined();
  });
});
