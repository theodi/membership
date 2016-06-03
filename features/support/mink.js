var Mink = require('cucumber-mink');

// Local Chrome
const parameters = {
  driver: {
    logLevel: 'silent',
    desiredCapabilities: {
      browserName: 'firefox',
    },
    port: 4444,
  },
};

module.exports = function () {
  Mink.init(this, parameters);
};
