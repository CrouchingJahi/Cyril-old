require('babel-register');
const { app, BrowserWindow } = require('electron');
const client = require('electron-connect').client;
const API = require('./services/API');
const reqVersion = require('../package').engines.node;
const semver = require('semver');

if (!semver.satisfies(process.version, reqVersion)) {
  console.warn('------------------------------------------');
  console.warn('Warning: This version of Node is not tested to be compatible with Cyril. It is recommended that you upgrade to a version ' + reqVersion + '.');
  console.warn('------------------------------------------');
}

var win;

app.on('ready', () => {
  win = new BrowserWindow({
    width: 1024,
    height: 768,
    // icon: 'images/icon.png',
    title: 'Cyril',
    backgroundColor: '#333B3D'
  });
  win.loadURL('file://' + __dirname + '/index.html');
  win.on('closed', () => {
    win = null;
  });

  //These two lines should be omitted when packaging the app
  win.webContents.openDevTools();
  client.create(win);

  API.start(status => {
    if (status) {
      console.log('API layer started successfully.');
    }
  });
});
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
