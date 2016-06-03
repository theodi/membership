require('dotenv').config();

var Mink = require('cucumber-mink');

// Local Chrome
const parameters = {
  driver: {
    desiredCapabilities: {
      'browserName': 'chrome',
      'platform': 'Windows 10',
      'version': '50',
    },
    host: 'ondemand.saucelabs.com',
    port: 80,
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
    logLevel: 'silent',
  },
};

module.exports = function () {
  Mink.init(this, parameters);
};
