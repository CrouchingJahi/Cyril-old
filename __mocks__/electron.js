module.exports = {
  remote: { app: { getVersion: jest.genMockFunction() } },
  shell: { openExternal: jest.genMockFunction() }
};
