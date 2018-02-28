var helper = require('../test_helper');
var dialogs = require('../../lib/dialogs')

describe('equipment type', function() {
  let bot;
  let botTester;
  this.timeout(15000);
  
  beforeEach(function() {
    bot = helper.testBot(helper.connector, {
      '/': dialogs.equipmentType,
      'checkEquipment': dialogs.checkEquipment
    })
    botTester = new helper.botTester.BotTester(bot)
  });
  
  context('gives me links for', function() {
      
      it('help in the bathroom', function() {
        return botTester
          .sendMessageToBot(
            'Getting on the toilet',
            'OK, I\'ve found some information on equipment that can help you in the bathroom on the My Equipment Newcastle website'
          )
          .runTest();
      })

      it('help in the bedroom', function() {
        return botTester
          .sendMessageToBot(
            'Getting out of bed',
            'OK, I\'ve found some information on equipment that can help you in the bedroom on the My Equipment Newcastle website'
          )
          .runTest();
      })

      it('help in the dining room', function() {
        return botTester
          .sendMessageToBot(
            'Eating my dinner',
            'OK, I\'ve found some information on equipment that can help you in the dining room on the My Equipment Newcastle website'
          )
          .runTest();
      })

      it('help in the garden', function() {
        return botTester
          .sendMessageToBot(
            'mowing the lawn',
            'OK, I\'ve found some information on equipment that can help you in the garden on the My Equipment Newcastle website'
          )
          .runTest();
      })

      it('help in the office', function() {
        return botTester
          .sendMessageToBot(
            'reading and writing',
            'OK, I\'ve found some information on equipment that can help you in the office on the My Equipment Newcastle website'
          )
          .runTest();
      })

      it('help in the kitchen', function() {
        return botTester
          .sendMessageToBot(
            'cooking my dinner',
            'OK, I\'ve found some information on equipment that can help you in the kitchen on the My Equipment Newcastle website'
          )
          .runTest();
      })

      it('help in the lounge', function() {
        return botTester
          .sendMessageToBot(
            'getting out of my chair',
            'OK, I\'ve found some information on equipment that can help you in the lounge on the My Equipment Newcastle website'
          )
          .runTest();
      })

      it('help on the stairs', function() {
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
