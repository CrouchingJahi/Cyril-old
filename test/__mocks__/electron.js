module.exports = {
  remote: { app: { getVersion: jest.genMockFunction() } },
  app: { getPath: jest.fn().mockReturnValue('path') },
  shell: { openExternal: jest.genMockFunction() }
};
