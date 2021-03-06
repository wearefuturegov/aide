var path = require('path');

var helper = require(path.resolve('test', 'test_helper'));
var dialogs = require(path.resolve('lib', 'dialogs'))
var t = require(path.resolve('lib', 'config'))

describe('equipment', function() {
  let bot;
  let botTester;
  this.timeout(15000);
  
  beforeEach(function() {
    bot = helper.testBot(helper.connector, {
      '/': dialogs.checkEquipment,
      'equipmentType': dialogs.equipmentType,
      'gettingEquipment': dialogs.gettingEquipment
    })
    botTester = new helper.botTester.BotTester(bot)
  });
  
  context('asks me if the information was helpful', function() {
    
    beforeEach(function() {
      botTester
        .sendMessageToBot(
          'yes',
          t.equipment.what_you_were_looking_for
        )
    });
    
    context('yes', function() {
      
      it('asks me if I want to find out about paying for it', function() {
        return botTester
          .sendMessageToBot(
            'yes',
            t.equipment.move_to_getting
          )
          .runTest();
      })
      
    })
    
    context('no', function() {
      
      it('asks me to try again', function() {
        return botTester
          .sendMessageToBot(
            'no',
            t.rephrase
          )
          .runTest();
      })
      
    })
    
  })
  
  context('asks me if I am interested in finding out how to pay', function() {
    
    beforeEach(function() {
      botTester
        .sendMessageToBot(
          'yes',
          t.equipment.what_you_were_looking_for
        )
        .sendMessageToBot(
          'yes',
          t.equipment.move_to_getting
        )
    });
    
    context('yes', function() {
      
      it('forwards me to information about paying for care', function() {
        return botTester
          .sendMessageToBot(
            'yes',
            t.getting_equipment.info_1
          )
          .runTest();
      })
      
    })
    
    context('no', function() {
      
      it('asks me if there is anything else', function() {
        return botTester
          .sendMessageToBot(
            'no',
            t.equipment.anything_else
          )
          .runTest();
      })
      
    })
    
  })
  
  context('anything else', function() {
    
    beforeEach(function() {
      botTester
        .sendMessageToBot(
          'yes',
          t.equipment.what_you_were_looking_for
        )
        .sendMessageToBot(
          'yes',
          t.equipment.move_to_getting
        )
        .sendMessageToBot(
          'no',
          'OK. Is there anything else I can help you with?'
        )
    });
    
    context('yes', function() {
      
      it('forwards me to the start', function() {
        return botTester
          .sendMessageToBot(
            'yes',
            ''
          )
          .runTest();
      })
      
    })
    
    context('no', function() {
      
      it('closes the conversation', function() {
        return botTester
          .sendMessageToBot(
            'no',
            t.end_conversation
          )
          .runTest();
      })
      
    })
    
  })
  
});
