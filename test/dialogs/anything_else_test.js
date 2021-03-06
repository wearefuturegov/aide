var path = require('path');

var helper = require(path.resolve('test', 'test_helper'));
var dialogs = require(path.resolve('lib', 'dialogs'))
var t = require(path.resolve('lib', 'config'))

describe('anything else', function() {
  let bot;
  let botTester;
  this.timeout(15000);
  
  beforeEach(function() {
    bot = helper.testBot(helper.connector, {
      '/': dialogs.anythingElse,
      'helpChooser': dialogs.helpChooser,
    })
    botTester = new helper.botTester.BotTester(bot)
    
    botTester.sendMessageToBot(
      'hello',
      t.anything_else
    )
  });
  
  it('forwards me to the helpChooser', function() {
    return botTester
      .sendMessageToBot(
        'yes',
        t.care_intro.help_intro
      )
      .runTest();
  })
  
  it('says goodbye', function() {
    return botTester
      .sendMessageToBot(
        'no',
        t.end_conversation
      )
      .runTest();
  })
  
})
