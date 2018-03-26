var path = require('path');

var helper = require(path.resolve('test', 'test_helper'));
var dialogs = require(path.resolve('lib', 'dialogs'))
var t = require(path.resolve('lib', 'config'))

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
  
  describe('more about assessment', function() {
    
    beforeEach(function() {
      botTester
        .sendMessageToBot(
          t.getting_equipment.choices[1],
          t.getting_equipment.council_support,
          t.getting_equipment.assessment
        )
    });
    
    it('gives me assessment info', function() {
      return botTester
        .sendMessageToBot(
          'yes',
          t.assessment
        )
        .runTest();
    })
    
    it('asks me if there is anything else', function() {
      return botTester
        .sendMessageToBot(
          'no',
          t.anything_else
        )
        .runTest();
    })
    
  })
      
})
