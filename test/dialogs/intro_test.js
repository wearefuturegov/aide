var helper = require('../test_helper');
var dialogs = require('../../lib/dialogs')

describe('intro', function() {
  let bot;
  let botTester;
  this.timeout(15000);
  
  beforeEach(function() {
    bot = helper.testBot(helper.connector, {
      '/': dialogs.intro,
      'confirm': dialogs.confirm,
      'equipment': dialogs.equipment,
      'payingforcare': dialogs.payingForCare
    })
    botTester = new helper.botTester.BotTester(bot)
  });
  
  it('Points me to equipment', function() {
    return botTester
      .sendMessageToBot(
        'Equipment',
        'OK, I can see you need help with an equipment request, is that right?'
      )
      .sendMessageToBot(
        'yes',
        'Is this for you or someone else?'
      )
      .runTest();
  });
  
  it('Points me to paying for care', function() {
    return botTester
      .sendMessageToBot(
        'Help me pay for care',
        'OK, I can see you need help with paying for care, is that right?'
      )
      .sendMessageToBot(
        'yes',
        'Here is some information that can help you learn more about paying for care:'
      )
      .runTest();
  });
  
});
