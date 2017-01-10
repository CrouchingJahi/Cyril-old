import React from 'react';
import { mount } from 'enzyme';
import Router, { routeEvent } from '../app/ui/router/Router.jsx';
import Link from '../app/ui/router/Link.jsx';

describe('The Link component', () => {
  let component = mount(<Link state="test">blah</Link>);

  it('renders as an anchor', () => {
    expect(component.html()).toBe('<a href="true">blah</a>');
  });
  it('emits a router state change event when activated', () => {
    let container = component.getDOMNode().parentNode;
    var routedTo = false;
    const routeResponder = (e) => {
      routedTo = e.detail;
    };

    container.addEventListener('route', routeResponder);
    component.simulate('click');
    expect(routedTo).toBe('test');
    container.removeEventListener('route', routeResponder);
  });
});
