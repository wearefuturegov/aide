var helper = require('../test_helper');
var dialogs = require('../../lib/dialogs')
var config = require('../../lib/config')

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
    
      beforeEach(function() {
        botTester.sendMessageToBot(
          'Hello',
          config.equipment.kind_of_help
        )
      })
      
      it('help in the bathroom', function() {
        return botTester
          .sendMessageToBot(
            'Getting on the toilet',
            config.equipment.bathroom.message
          )
          .runTest();
      })

      it('help in the bedroom', function() {
        return botTester
          .sendMessageToBot(
            'Getting out of bed',
            config.equipment.bedroom.message
          )
          .runTest();
      })

      it('help in the dining room', function() {
        return botTester
          .sendMessageToBot(
            'Eating my dinner',
            config.equipment.diningroom.message
          )
          .runTest();
      })

      it('help in the garden', function() {
        return botTester
          .sendMessageToBot(
            'mowing the lawn',
            config.equipment.garden.message
          )
          .runTest();
      })

      it('help in the office', function() {
        return botTester
          .sendMessageToBot(
            'reading and writing',
            config.equipment.office.message
          )
          .runTest();
      })

      it('help in the kitchen', function() {
        return botTester
          .sendMessageToBot(
            'cooking my dinner',
            config.equipment.kitchen.message
          )
          .runTest();
      })

      it('help in the lounge', function() {
        return botTester
          .sendMessageToBot(
            'getting out of my chair',
            config.equipment.lounge.message
          )
          .runTest();
      })

      it('help on the stairs', function() {
        return botTester
          .sendMessageToBot(
            'getting up the stairs',
            config.equipment.stairs.message
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
