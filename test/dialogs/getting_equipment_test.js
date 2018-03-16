var helper = require('../test_helper');
var dialogs = require('../../lib/dialogs')
var t = require('../../lib/config')

describe('getting equipment', function() {
  let bot;
  let botTester;
  this.timeout(15000);
  
  beforeEach(function() {
    bot = helper.testBot(helper.connector, {
      '/': dialogs.gettingEquipment,
      'assessment': dialogs.assessment,
      'anythingElse': dialogs.anythingElse,
    })
    botTester = new helper.botTester.BotTester(bot)
  });
  
  it('gives me some information', function() {
    return botTester
      .sendMessageToBot(
        'hello',
        t.getting_equipment.info
      )
      .runTest();
  })
  
  describe('self or council', function() {
    
    beforeEach(function() {
      botTester.sendMessageToBot(
        'hello',
        t.getting_equipment.info
      )
    });
    
    it('gives me some info about self support', function() {
      return botTester
        .sendMessageToBot(
          t.getting_equipment.choices[0],
          t.getting_equipment.access_myself
        )
        .runTest();
    })
    
    it('gives me some info about council support', function() {
      return botTester
        .sendMessageToBot(
          t.getting_equipment.choices[1],
          t.getting_equipment.council_support
        )
        .runTest();
    })
    
  })
  
})
