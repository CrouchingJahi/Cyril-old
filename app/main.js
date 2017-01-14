'use strict';

const {app, BrowserWindow} = require('electron');
const client = require('electron-connect').client;

// app.commandLine.appendSwitch('disable-http-cache');
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow () {
  win = new BrowserWindow({
    width: 1024,
    height: 768,
    // icon: 'images/icon.png',
    title: 'Cyril'
  });
  win.loadURL('file://' + __dirname + '/index.html');
  win.webContents.openDevTools();
  win.on('closed', () => {
    win = null;
  });
  client.create(win);
}

app.on('ready', createWindow);
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
