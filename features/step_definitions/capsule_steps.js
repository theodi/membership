require('dotenv').config();

var expect = require('chai').expect
var capsule = require('capsule-crm').createConnection(process.env.CAPSULE_USER, process.env.CAPSULE_TOKEN)

module.exports = function () {

  this.Then(/^there should still be just one person in CapsuleCRM called "([^"]*)" with email "([^"]*)"$/, function (name, email, callback) {
    name = name.split(' ')
    firstName = name[0]
    lastName = name[1]

    capsule.request({ path: '/party', search: 'email=' + email + '&firstName=' + firstName + '&lastName=' + lastName }, function(err, data) {
      expect(data.parties['@size']).to.eq('1')
      callback();
    });
  });

}
