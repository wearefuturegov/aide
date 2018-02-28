var helper = require('../test_helper');
var dialogs = require('../../lib/dialogs')
var t = require('../../lib/config')

describe('intro', function() {
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
        t.payingforcare.info_3
      )
      .runTest();
  })
  
  context('asks me if I want to start an assessment', function() {
    
    beforeEach(function() {
      botTester
        .sendMessageToBot(
          'hello',
          t.payingforcare.info_1
        )
    })
    
    context('yes', function() {
      
      it('forwards me to starting an assessment', function() {
        return botTester
          .sendMessageToBot(
            'yes',
            t.assessment.intro,
            t.assessment.first_name
          ).runTest();
      })
      
    })
    
    context('no', function() {
      
      it('closes the conversation', function() {
        return botTester
          .sendMessageToBot(
            'no',
            t.end_conversation
          ).runTest();
      })
      
    })
    
  })
  
})
