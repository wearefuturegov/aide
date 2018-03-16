var helper = require('../test_helper');
var dialogs = require('../../lib/dialogs')
var t = require('../../lib/config')

describe('assessment', function() {
  let bot;
  let botTester;
  this.timeout(15000);
  
  beforeEach(function() {
    bot = helper.testBot(helper.connector, {
      '/': dialogs.assessment,
      'anythingElse': dialogs.anythingElse,
      'helpChooser': dialogs.helpChooser
    })
    botTester = new helper.botTester.BotTester(bot)
    
    botTester.sendMessageToBot(
      'hello',
      t.assessment,
      t.what_you_were_looking_for
    )
  });
  
  it('asks me if there is anything else', function() {
    return botTester
      .sendMessageToBot(
        'yes',
        t.great,
        t.anything_else
      )
      .runTest();
  })
  
  it('asks me to rephrase', function() {
    return botTester
      .sendMessageToBot(
        'no',
        t.rephrase
      )
      .runTest();
  })
  
})
