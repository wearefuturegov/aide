var helper = require('../test_helper');
var dialogs = require('../../lib/dialogs')
var t = require('../../lib/config')

describe('paying for care', function() {
  let bot;
  let botTester;
  this.timeout(15000);
  
  beforeEach(function() {
    bot = helper.testBot(helper.connector, {
      '/': dialogs.payingForCare,
      'assessment': dialogs.assessment,
    })
    botTester = new helper.botTester.BotTester(bot)
  });
  
  it('gives me some information', function() {
    return botTester
      .sendMessageToBot(
        'hello',
        t.payingforcare.info_1,
        t.payingforcare.info_2,
        t.payingforcare.info_3,
        t.payingforcare.info_4
      )
      .runTest();
  })
  
})
