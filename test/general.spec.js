// import React from 'react';
// import Home from '../app/ui/cyril.js';
// import renderer from 'react-test-renderer';
var React = require('react'),
  Home = require('../app/ui/cyril.js').home;

test('has a Home component', () => {
  // const sum = require('../src/jsx/app.jsx');
  // expect(sum(1, 2)).toBe(3);
  // const component = renderer.create(<Home />);
  const component = React.createElement(Home, null);
  console.log(component);
  expect(1+2).toBe(3);
  // console.log(Home.render());
});
