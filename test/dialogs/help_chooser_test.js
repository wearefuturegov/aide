var helper = require('../test_helper');
var dialogs = require('../../lib/dialogs')
var t = require('../../lib/config')

describe('intro', function() {
  let bot;
  let botTester;
  this.timeout(15000);
  
  beforeEach(function() {
    bot = helper.testBot(helper.connector, {
      '/': dialogs.help_chooser,
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
        t.help_chooser.confirm.equipment
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
        t.help_chooser.confirm.paying
      )
      .sendMessageToBot(
        'yes',
        t.payingforcare.info_1
      )
      .runTest();
  });
  
  it('Tells me it can\'t understand', function() {
    return botTester
      .sendMessageToBot(
        'Something',
        'Sorry, I did not understand \'Something\'. Please try rephrasing your request'
      )
      .runTest();
  });
  
  it('Presents me with options the second time round', function() {
    return botTester
      .sendMessageToBot(
        'Something',
        'Sorry, I did not understand \'Something\'. Please try rephrasing your request'
      )
      .sendMessageToBot(
        'Something',
        t.help_chooser.options
      )
      .runTest();
  })
  
});
