import React from 'react';
import { render } from 'react-dom';

import Router from './router/Router';
import SplashScreen from './splash/Splash';
import MenuScreen from './menu/Menu';
import UploadScreen from './upload/Upload';

const routes = {
  'splash': SplashScreen,
  'menu': MenuScreen,
  'upload': UploadScreen,
};

document.addEventListener("DOMContentLoaded", () => {
  render(
    <Router states={routes} default="splash" />
  , document.getElementById('cyril'));
});
