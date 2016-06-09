var Mink = require('cucumber-mink');

Mink.When(/^I run my zap$/, function () {
  return Mink.manyStep([
    'I am on "https://zapier.com/app/dashboard/folder/39182"',
    'I fill in "#login-form-static #email" with "ops@theodi.org"',
    'I fill in "#login-form-static #password" with "'+ process.env.ZAPIER_PASSWORD +'"',
    'I press "Log In"',
    'I wait 2 seconds',
    'I click on "div[data-zap-id=\'9513665\'] .menu-button"',
    'I click on ".run"',
    'I wait 10 seconds'
  ])
});
