import React from 'react';
import { render } from 'react-dom';
// import { Router, Route, browserHistory } from 'react-router'

import Router from './router/Router.jsx';
import Home from './home/Page_Home.jsx';

const routes = {
  'home': Home
};

document.addEventListener("DOMContentLoaded", function(event) {
  var container = document.getElementById('cyril');
  render(
    <Router states={routes} default="home" />
    /*
    <Router history={browserHistory}>
      <Route path="/" component={Test} />
    </Router>
    */
  , container);
});

module.exports = this;
