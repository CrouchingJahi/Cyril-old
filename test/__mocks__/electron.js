module.exports = {
  remote: {
    app: { getVersion: jest.genMockFunction() },
    dialog: { showMessageBox: jest.genMockFunction() }
  },
  app: { getPath: jest.fn().mockReturnValue('path') },
  shell: { openExternal: jest.genMockFunction() },
  ipcMain: { on: jest.genMockFunction() },
  ipcRenderer: {
    once: function (name, cb) {
      cb();
    },
    send: jest.genMockFunction()
  },
};
