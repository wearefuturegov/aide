var helper = require('../test_helper');
var dialogs = require('../../lib/dialogs')
var t = require('../../lib/config')

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
        t.intro.confirm.equipment
      )
      .sendMessageToBot(
        'yes',
        t.equipment.for_you
      )
      .runTest();
  });
  
  it('Points me to paying for care', function() {
    return botTester
      .sendMessageToBot(
        'Help me pay for care',
        t.intro.confirm.paying
      )
      .sendMessageToBot(
        'yes',
        t.payingforcare.info_1
      )
      .runTest();
  });
  
});
