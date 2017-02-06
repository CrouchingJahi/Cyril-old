import React from 'react';
import { render } from 'react-dom';

import Router from './router/Router';
import SplashScreen from './splash/Splash';
import MenuScreen from './menu/Menu';

const routes = {
  'splash': SplashScreen,
  'menu': MenuScreen
};

document.addEventListener("DOMContentLoaded", function(event) {
  var container = document.getElementById('cyril');
  render(
    <Router states={routes} default="splash" />
  , container);
});
