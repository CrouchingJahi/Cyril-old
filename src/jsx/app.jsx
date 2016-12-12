var React = require('react'),
  render = require('react-dom').render;
// import React from 'react'
// import { render } from 'react-dom'
// import { Router, Route, browserHistory } from 'react-router'

// import Home from './app/page/home';
// require('./app/page/home');

document.addEventListener("DOMContentLoaded", function(event) {
  var container = document.getElementById('cyril');
  render(
    <Home />
    /*
    <Router history={browserHistory}>
      <Route path="/" component={Test} />
    </Router>
    */
  , container);
});
