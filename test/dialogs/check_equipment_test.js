var helper = require('../test_helper');
var dialogs = require('../../lib/dialogs')

describe('equipment', function() {
  let bot;
  let botTester;
  this.timeout(15000);
  
  beforeEach(function() {
    bot = helper.testBot(helper.connector, {
      '/': dialogs.checkEquipment,
      'equipmentType': dialogs.equipmentType,
      'payingforcare': dialogs.payingForCare
    })
    botTester = new helper.botTester.BotTester(bot)
  });
  
  context('asks me if the information was helpful', function() {
    
    beforeEach(function() {
      botTester
        .sendMessageToBot(
          'yes',
          'Was that helpful?'
        )
    });
    
    context('yes', function() {
      
      it('asks me if I want to find out about paying for it', function() {
        return botTester
          .sendMessageToBot(
            'yes',
            'Great! Glad I could help. Are you interested in finding out more about paying for this equipment?'
          )
          .runTest();
      })
      
    })
    
    context('no', function() {
      
      it('asks me to try again', function() {
        return botTester
          .sendMessageToBot(
            'no',
            'Sorry to hear that. I\'m still learning. Could you maybe try rephrasing your question?'
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
          'Was that helpful?'
        )
        .sendMessageToBot(
          'yes',
          'Great! Glad I could help. Are you interested in finding out more about paying for this equipment?'
        )
    });
    
    context('yes', function() {
      
      it('forwards me to information about paying for care', function() {
        return botTester
          .sendMessageToBot(
            'yes',
            'Here is some information that can help you learn more about paying for care:'
          )
          .runTest();
      })
      
    })
    
    context('no', function() {
      
      it('asks me if there is anything else', function() {
        return botTester
          .sendMessageToBot(
            'no',
            'OK. Is there anything else I can help you with?'
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
          'Was that helpful?'
        )
        .sendMessageToBot(
          'yes',
          'Great! Glad I could help. Are you interested in finding out more about paying for this equipment?'
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
            'No problem, hope you found me useful'
          )
          .runTest();
      })
      
    })
    
  })
  
});
