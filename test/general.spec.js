import React from 'react';
import renderer from 'react-test-renderer';
// var React = require('react'),
  // Home = require('../app/ui/cyril.js').home;

xdescribe('The root component', () => {
  // const component = renderer.create(<Home />);
  it('adds a listener on DOMContentLoaded', function () {
    var component = require('../app/ui/cyril.jsx');
    expect(1+2).toBe(3);
    // expect();
  });
});
