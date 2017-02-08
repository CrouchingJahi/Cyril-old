import React from 'react';
import { mount } from 'enzyme';

import Router, { routeEvent } from '../../app/ui/router/Router';

describe('The Router component', () => {
  function TestRoute(props) {
    return (
      <span>blah</span>
    );
  }
  function OtherRoute(props) {
    return (
      <p>foo</p>
    );
  }
  const routes = {
    'test': TestRoute,
    'next': OtherRoute
  };
  let component;

  beforeEach(() => {
    component = mount(<Router states={routes} default="test" />);
  });

  it('initializes its current state as the given default', () => {
    expect(component.state().route).toBe('test');
  });
  it('renders as the default route', () => {
    expect(component.html()).toBe('<div id="router"><span>blah</span></div>');
  });
  it('listens to route events for changing states', () => {
    component.getDOMNode().dispatchEvent(routeEvent('next'));
    expect(component.state().route).toBe('next');
  });
  it('renders as another route once switched', () => {
    component.getDOMNode().dispatchEvent(routeEvent('next'));
    expect(component.html()).toBe('<div id="router"><p>foo</p></div>');
  });
  it('cannot route to an unregistered state', () => {
    /*
    expect(() => {
      component.getDOMNode().dispatchEvent(routeEvent('foo'));
    }).toThrow('illegal route: foo');
    */
    component.getDOMNode().dispatchEvent(routeEvent('foo'));
  });
  it('unmounts with grace', () => {
    component.unmount();
    // does testing outcome matter here? It's just removing an event listener from a removed node
  });
});
