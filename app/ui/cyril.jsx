import React from 'react';
import { render } from 'react-dom';
// import { Router, Route, browserHistory } from 'react-router'

import Home from './home/Page_Home.jsx';

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

module.exports = this;
