var helper = require('../test_helper');
var dialogs = require('../../lib/dialogs')
var t = require('../../lib/config')

describe('intro', function() {
  let bot;
  let botTester;
  this.timeout(15000);
  
  beforeEach(function() {
    bot = helper.testBot(helper.connector, {
      '/': dialogs.assessment,
      'assessment': dialogs.assessment,
    })
    botTester = new helper.botTester.BotTester(bot)
  });
  
  it('runs an assessment', function() {
    return botTester
      .sendMessageToBot(
        'hello',
        t.assessment.first_name
      )
      .sendMessageToBot(
        'Ian',
        t.assessment.surname
      )
      .sendMessageToBot(
        'Example',
        t.assessment.phone_number
      )
      .sendMessageToBot(
        '123456',
        t.assessment.info,
        'First Name: Ian',
        'Surname: Example',
        'Phone Number: 123456'
      ).runTest();
  })
  
  context('checks the information is correct', function() {
    
    beforeEach(function() {
      botTester
        .sendMessageToBot(
          'hello',
          t.assessment.first_name
        )
        .sendMessageToBot(
          'Ian',
          t.assessment.surname
        )
        .sendMessageToBot(
          'Example',
          t.assessment.phone_number
        )
        .sendMessageToBot(
          '123456',
          t.assessment.info
        )
    })
    
    context('yes', function() {
      
      it('tells me the information has been passed on', function() {
        return botTester
          .sendMessageToBot(
            'yes',
            t.assessment.thank_you
          ).runTest();
      })
      
    })
    
    context('no', function() {
      
      it('asks me again', function() {
        return botTester
          .sendMessageToBot(
            'no',
            t.assessment.first_name
          ).runTest();
      })
      
    })
    
  })
  
})
  
