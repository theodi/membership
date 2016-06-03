var Mink = require('cucumber-mink');
var pry = require("pryjs")
var Fs = require("fs")

var expect = require('chai').expect
var cheerio = require('cheerio')

Mink.Given(/^I inject the script "([^"]*)"$/, function (script) {
  return this.driver.html().then(html => {
    js = Fs.readFileSync(script, {encoding: 'utf-8'})
    this.driver.client.execute(js)
  });
});

Mink.Then(/^I should see the text "([^"]*)" in the "([^"]*)" element$/, function (expected, selector) {
  return this.driver.html(selector).then(html => {
    text = html.replace(/<(?:.|\n)*?>/gm, '')
    expect(text).to.contain(expected);
  });
});

Mink.Then(/^the (\d+).{2} "([^"]*)" element should have the "([^"]*)" "([^"]*)"$/, function (index, selector, key, value) {
  return this.driver.html().then(html => {
    $ = cheerio.load(html)
    expect($(selector).eq(index - 1).attr(key)).to.eq(value);
  });
});

Mink.Then(/^the selector "([^"]*)" should be contained inside the "([^"]*)" selector$/, function (child, parent) {
  return this.driver.html().then(html => {
    $ = cheerio.load(html)
    $(child).parents().index($(parent))
  });
});


Mink.Then(/^the first letter of each header and input element should be wrapped in a span$/, function () {
  [
    "<span>M</span>embers benefit from:",
    "<span>T</span>ax Information:",
    "<span>V</span>AT Number",
    "<span>C</span>ontact Information:",
    "<span>F</span>irst Name",
    "<span>L</span>ast Name",
    "<span>E</span>mail Address",
    "<span>P</span>hone",
    "<span>O</span>rganisation",
    "<span>S</span>ector",
    "<span>C</span>hoose what to pay",
    "<span>P</span>ay what you can",
    "<span>P</span>urchase Summary:",
    "<span>B</span>illing Information",
    "<span>C</span>oupon code",
    "<span>F</span>irst Name on Account",
    "<span>L</span>ast Name on Account",
    "<span>C</span>ard Number",
    "<span>C</span>VV",
    "<span>E</span>xpiry",
    "<span>B</span>illing Address:",
    "<span>A</span>ddress 1",
    "<span>A</span>ddress 2",
    "<span>B</span>illing Country",
    "<span>B</span>illing State",
    "<span>B</span>illing City",
    "<span>P</span>ostcode",
    "<span>A</span>dditional Information:",
    "<span>I</span> accept the Terms and Conditions",
  ].forEach(function(i) {
    Mink.runStep('I should see "' + i +'"', function(err) {
      expect(err).to.be.a('null');
    });
  })
});
