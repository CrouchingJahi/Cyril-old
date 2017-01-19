import React from 'react';
import { mount } from 'enzyme';

import SplashScreen from '../../app/ui/splash/Splash.jsx';
import { shell } from 'electron';

describe('The splash screen', () => {
  const component = mount(<SplashScreen />);

  it('renders', () => {
    expect(component).toBeDefined();
    expect(component.html()).toBeDefined();
  });

  it('opens external page when the github link is clicked', () => {
    let link = component.find('a').findWhere(a => a.text() == 'GitHub Page');
    link.simulate('click');
    expect(shell.openExternal).toHaveBeenCalledWith('https://github.com/CrouchingJahi/Cyril/');
  });
});
