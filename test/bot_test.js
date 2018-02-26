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
          'Equipment',
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
        
        it('asks me what kind of help I need', function() {
          return botTester
            .sendMessageToBot(
              'Yes',
              'What kind of help do you need? For example, do you need help with bathing or eating, or do you have an audio or visual impairment?'
            )
            .runTest();
        })
        
        describe('step3', function() {
          this.timeout(15000);
          
          beforeEach(function() {
            botTester
              .sendMessageToBot(
                'Yes',
                'What kind of help do you need? For example, do you need help with bathing or eating, or do you have an audio or visual impairment?'
              )
          });
          
          it('Gives me a link to help in the bathroom', function() {
            return botTester
              .sendMessageToBot(
                'Getting on the toilet',
                'OK, I\'ve found some information on equipment that can help you in the bathroom on the My Equipment Newcastle website'
              )
              .runTest();
          })
          
          it('Gives me a link to help in the bedroom', function() {
            return botTester
              .sendMessageToBot(
                'Getting out of bed',
                'OK, I\'ve found some information on equipment that can help you in the bedroom on the My Equipment Newcastle website'
              )
              .runTest();
          })
          
          it('Gives me a link to help in the dining room', function() {
            return botTester
              .sendMessageToBot(
                'Eating my dinner',
                'OK, I\'ve found some information on equipment that can help you in the dining room on the My Equipment Newcastle website'
              )
              .runTest();
          })
          
          it('Gives me a link to help in the garden', function() {
            return botTester
              .sendMessageToBot(
                'mowing the lawn',
                'OK, I\'ve found some information on equipment that can help you in the garden on the My Equipment Newcastle website'
              )
              .runTest();
          })
          
          it('Gives me a link to help in the office', function() {
            return botTester
              .sendMessageToBot(
                'reading and writing',
                'OK, I\'ve found some information on equipment that can help you in the office on the My Equipment Newcastle website'
              )
              .runTest();
          })
          
          it('Gives me a link to help in the kitchen', function() {
            return botTester
              .sendMessageToBot(
                'cooking my dinner',
                'OK, I\'ve found some information on equipment that can help you in the kitchen on the My Equipment Newcastle website'
              )
              .runTest();
          })
          
          it('Gives me a link to help in the lounge', function() {
            return botTester
              .sendMessageToBot(
                'getting out of my chair',
                'OK, I\'ve found some information on equipment that can help you in the lounge on the My Equipment Newcastle website'
              )
              .runTest();
          })
          
          it('Gives me a link to help on the stairs', function() {
            return botTester
              .sendMessageToBot(
                'getting up the stairs',
                'OK, I\'ve found some information on equipment that can help you on the stairs on the My Equipment Newcastle website'
              )
              .runTest();
          })
          
          it('tells me it cannot understand', function() {
            return botTester
              .sendMessageToBot(
                'going waterskiing',
                'Sorry, I did not understand \'going waterskiing\'. Could you maybe rephrase?'
              )
              .runTest();
          })
          
        })
        
      })
      
    })
    
  })
  

});
