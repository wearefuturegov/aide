require('dotenv').config()

var _botBuilder = require('botbuilder');
var _botTester = require('bot-tester');

var bot = require('../lib/bot');

const connector = new _botTester.TestConnector({
  defaultAddress: _botBuilder.IAddress
});

describe('bot', function() {
  let myBot;
  let botTester;
  
  beforeEach(function() {
    myBot = bot.botConstructor(connector)
    botTester = new _botTester.BotTester(myBot)
  });
  
  describe('confirm', function() {
    it('Points me to equipment', function() {
      return botTester
        .sendMessageToBot(
          'Need help getting on the toilet',
          'OK, I can see you need help with an equipment request, is that right?'
        )
        .sendMessageToBot(
          'yes',
          'Is this for you or someone else?'
        )
        .runTest();
    });
    
    it('Points me to paying for care', function() {
      return botTester
        .sendMessageToBot(
          'Help me pay for care',
          'OK, I can see you need help with paying for care, is that right?'
        )
        .sendMessageToBot(
          'yes',
          'Here is some information that can help you learn more about paying for care:'
        )
        .runTest();
    })
    
  })
  
  describe('equipment', function() {
    
    beforeEach(function() {
      botTester
        .sendMessageToBot(
          'Need help getting on the toilet',
          'OK, I can see you need help with an equipment request, is that right?'
        )
    });
    
    describe('step 1', function() {
      
      beforeEach(function() {
        botTester
          .sendMessageToBot(
            'yes',
            'Is this for you or someone else?'
          )
      });
      
      it('asks me if I live in Newcastle', function() {
        return botTester
          .sendMessageToBot(
            'Me',
            'Do you live in Newcastle?'
          )
          .runTest();
      });
      
      it('asks me if the person lives in Newcastle', function() {
        return botTester
          .sendMessageToBot(
            'Someone Else',
            'Does the person live in Newcastle?'
          )
          .runTest();
      });
      
      describe('step 2', function() {
        
        beforeEach(function() {
          botTester
            .sendMessageToBot(
              'Me',
              'Do you live in Newcastle?'
            )
        });
        
        it('says the bot cannot help', function() {
          return botTester
            .sendMessageToBot(
              'No',
              'I am only able to advise residents of Newcastle because all my advice is local to the area. Please contact you local authority or local resources for information that could help you in your area.'
            )
            .runTest();
        })
        
        it('shows me some equipment', function() {
          return botTester
            .sendMessageToBot(
              'Yes',
              'I found some equipment I think might help with issues of mobility around using the toilet. Please have a look below.'
            )
            .runTest();
        })
        
        describe('step3', function() {
          
          beforeEach(function() {
            botTester
              .sendMessageToBot(
                'Yes',
                'I found some equipment I think might help with issues of mobility around using the toilet. Please have a look below.'
              )
          });
          
          it('forwards me to paying for care', function() {
            return botTester
              .sendMessageToBot(
                'Yes',
                'Here is some information that can help you learn more about paying for care:'
              )
              .runTest();
          })
          
        })
        
      })
      
    })
    
  })
  

});
