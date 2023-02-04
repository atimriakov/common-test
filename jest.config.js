const jestConfig = require('@iso-cockpit/platform/jest.config');

module.exports = {
  ...jestConfig,
  rootDir: "",
  globals: {
    crypto: require('crypto'),
  },
};