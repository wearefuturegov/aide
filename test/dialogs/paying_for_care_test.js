var helper = require('../test_helper');
var dialogs = require('../../lib/dialogs')

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
        'Here is some information that can help you learn more about paying for care:',
        'https://www.informationnow.org.uk/article/paying-for-care/',
        'You can also get a financial assessment completed by the council to check if you are eligible for financial support.'
      )
      .runTest();
  })
  
  context('asks me if I want to start an assessment', function() {
    
    beforeEach(function() {
      botTester
        .sendMessageToBot(
          'hello',
          'Here is some information that can help you learn more about paying for care:'
        )
    })
    
    context('yes', function() {
      
      it('forwards me to starting an assessment', function() {
        return botTester
          .sendMessageToBot(
            'yes',
            'Great! We need to collect a few pieces of information so that we can pass it onto the Social Care Direct team to followup on your request for assessing payment support available to you.',
            'What is your first name?'
          ).runTest();
      })
      
    })
    
    context('no', function() {
      
      it('closes the conversation', function() {
        return botTester
          .sendMessageToBot(
            'no',
            'OK, have a great day'
          ).runTest();
      })
      
    })
    
  })
  
})
