require('babel-register');
const { app, BrowserWindow } = require('electron');
const client = require('electron-connect').client;
const API = require('./services/API');

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
  win.webContents.openDevTools();
  win.on('closed', () => {
    win = null;
  });
  client.create(win);
  API.start();
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
