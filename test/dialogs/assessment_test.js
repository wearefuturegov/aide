var helper = require('../test_helper');
var dialogs = require('../../lib/dialogs')

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
        'What is your first name?'
      )
      .sendMessageToBot(
        'Ian',
        'What is your surname?'
      )
      .sendMessageToBot(
        'Example',
        'Phone number we can use to contact you?'
      )
      .sendMessageToBot(
        '123456',
        'Thank you. Here\'s the information you\'ve provided',
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
          'What is your first name?'
        )
        .sendMessageToBot(
          'Ian',
          'What is your surname?'
        )
        .sendMessageToBot(
          'Example',
          'Phone number we can use to contact you?'
        )
        .sendMessageToBot(
          '123456',
          'Thank you. Here\'s the information you\'ve provided'
        )
    })
    
    context('yes', function() {
      
      it('tells me the information has been passed on', function() {
        return botTester
          .sendMessageToBot(
            'yes',
            'Thank you for answering my questions. I have now passed them to the Social Care Direct team.'
          ).runTest();
      })
      
    })
    
    context('no', function() {
      
      it('asks me again', function() {
        return botTester
          .sendMessageToBot(
            'no',
            'What is your first name?'
          ).runTest();
      })
      
    })
    
  })
  
})
  
