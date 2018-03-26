var path = require('path');

var helper = require(path.resolve('test', 'test_helper'));
var dialogs = require(path.resolve('lib', 'dialogs'))
var t = require(path.resolve('lib', 'config'))

describe('intro', function() {
  let bot;
  let botTester;
  this.timeout(15000);
  
  beforeEach(function() {
    bot = helper.testBot(helper.connector, {
      '/': dialogs.intro,
      'careIntro': dialogs.care_intro,
    })
    botTester = new helper.botTester.BotTester(bot)
  });
  
  it('Sends me to the care intro', function() {
    return botTester
      .sendMessageToBot(
        'Hello',
        t.care_intro.line_1
      )
      .runTest();
  });
  
});
