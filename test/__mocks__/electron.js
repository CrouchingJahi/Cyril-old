module.exports = {
  remote: { app: {
    getVersion: jest.genMockFunction(),
    getPath: jest.fn().mockReturnValue('path')
  } },
  shell: { openExternal: jest.genMockFunction() }
};
