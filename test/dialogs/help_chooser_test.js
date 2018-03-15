var helper = require('../test_helper');
var dialogs = require('../../lib/dialogs')
var t = require('../../lib/config')

describe('intro', function() {
  let bot;
  let botTester;
  this.timeout(15000);
  
  beforeEach(function() {
    bot = helper.testBot(helper.connector, {
      '/': dialogs.help_chooser,
      'confirm': dialogs.confirm,
      'equipmentType': dialogs.equipmentType,
      'payingforcare': dialogs.payingForCare,
      'confirmEquipment': dialogs.confirmEquipment
    })
    botTester = new helper.botTester.BotTester(bot)
  });
  
  it('Points me to equipment', function() {
    return botTester
      .sendMessageToBot(
        'Equipment',
        t.help_chooser.confirm.equipment
      )
      .sendMessageToBot(
        'yes',
        t.equipment.kind_of_help
      )
      .runTest();
  });
  
  it('Points me to paying for care', function() {
    return botTester
      .sendMessageToBot(
        'Help me pay for care',
        t.help_chooser.confirm.paying
      )
      .sendMessageToBot(
        'yes',
        t.payingforcare.info_1
      )
      .runTest();
  });
  
  describe('equipment', function() {
  
    it('help in the bathroom', function() {
      return botTester
        .sendMessageToBot(
          'Getting on the toilet',
          t.equipment.confirm.replace('%s', 'in the bathroom')
        )
        .runTest();
    })
  
    it('help in the bedroom', function() {
      return botTester
        .sendMessageToBot(
          'Getting out of bed',
          t.equipment.confirm.replace('%s', 'in the bedroom')
        )
        .runTest();
    })
  
    it('help in the dining room', function() {
      return botTester
        .sendMessageToBot(
          'Eating my dinner',
          t.equipment.confirm.replace('%s', 'in the dining room')
        )
        .runTest();
    })
  
    it('help in the garden', function() {
      return botTester
        .sendMessageToBot(
          'mowing the lawn',
          t.equipment.confirm.replace('%s', 'in the garden')
        )
        .runTest();
    })
  
    it('help in the office', function() {
      return botTester
        .sendMessageToBot(
          'reading and writing',
          t.equipment.confirm.replace('%s', 'in the office')
        )
        .runTest();
    })
  
    it('help in the kitchen', function() {
      return botTester
        .sendMessageToBot(
          'cooking my dinner',
          t.equipment.confirm.replace('%s', 'in the kitchen')
        )
        .runTest();
    })
  
    it('help in the lounge', function() {
      return botTester
        .sendMessageToBot(
          'getting out of my chair',
          t.equipment.confirm.replace('%s', 'in the lounge')
        )
        .runTest();
    })
  
    it('help on the stairs', function() {
      return botTester
        .sendMessageToBot(
          'getting up the stairs',
          t.equipment.confirm.replace('%s', 'on the stairs')
        )
        .runTest();
    })
  
  })
  
  it('Tells me it can\'t understand', function() {
    return botTester
      .sendMessageToBot(
        'Whatever',
        'Sorry, I did not understand \'Whatever\'. Please try rephrasing your request'
      )
      .runTest();
  });
  
  it('Presents me with options the second time round', function() {
    return botTester
      .sendMessageToBot(
        'Whatever',
        'Sorry, I did not understand \'Whatever\'. Please try rephrasing your request'
      )
      .sendMessageToBot(
        'Whatever',
        t.help_chooser.options
      )
      .runTest();
  })
  
});
