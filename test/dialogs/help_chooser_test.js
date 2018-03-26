var path = require('path');

var helper = require(path.resolve('test', 'test_helper'));
var dialogs = require(path.resolve('lib', 'dialogs'))
var t = require(path.resolve('lib', 'config'))

describe('help chooser', function() {
  let bot;
  let botTester;
  this.timeout(15000);
  
  beforeEach(function() {
    bot = helper.testBot(helper.connector, {
      '/': dialogs.helpChooser,
      'confirm': dialogs.confirm,
      'equipmentType': dialogs.equipmentType,
      'gettingEquipment': dialogs.gettingEquipment,
      'confirmEquipment': dialogs.confirmEquipment,
      'checkEquipment': dialogs.checkEquipment,
      'assessment': dialogs.assessment
    })
    botTester = new helper.botTester.BotTester(bot)
  });
  
  it('Points me to an assessment', function() {
    return botTester
      .sendMessageToBot(
        'Assessment',
        t.help_chooser.confirm.assessment
      )
      .sendMessageToBot(
        'yes',
        t.assessment
      )
      .runTest();
  });
  
  it('Points me to getting equipment', function() {
    return botTester
      .sendMessageToBot(
        'I need a wheelchair',
        t.help_chooser.confirm.getting_equipment
      )
      .sendMessageToBot(
        'yes',
        t.getting_equipment.info_1
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
        .sendMessageToBot(
          'yes',
          t.equipment.message.replace('%s', 'in the bathroom')
        )
        .runTest();
    })
  
    it('help in the bedroom', function() {
      return botTester
        .sendMessageToBot(
          'Getting out of bed',
          t.equipment.confirm.replace('%s', 'in the bedroom')
        )
        .sendMessageToBot(
          'yes',
          t.equipment.message.replace('%s', 'in the bedroom')
        )
        .runTest();
    })
  
    it('help in the dining room', function() {
      return botTester
        .sendMessageToBot(
          'Eating my dinner',
          t.equipment.confirm.replace('%s', 'in the dining room')
        )
        .sendMessageToBot(
          'yes',
          t.equipment.message.replace('%s', 'in the dining room')
        )
        .runTest();
    })
  
    it('help in the garden', function() {
      return botTester
        .sendMessageToBot(
          'mowing the lawn',
          t.equipment.confirm.replace('%s', 'in the garden')
        )
        .sendMessageToBot(
          'yes',
          t.equipment.message.replace('%s', 'in the garden')
        )
        .runTest();
    })
  
    it('help in the office', function() {
      return botTester
        .sendMessageToBot(
          'reading and writing',
          t.equipment.confirm.replace('%s', 'in the office')
        )
        .sendMessageToBot(
          'yes',
          t.equipment.message.replace('%s', 'in the office')
        )
        .runTest();
    })
  
    it('help in the kitchen', function() {
      return botTester
        .sendMessageToBot(
          'cooking my dinner',
          t.equipment.confirm.replace('%s', 'in the kitchen')
        )
        .sendMessageToBot(
          'yes',
          t.equipment.message.replace('%s', 'in the kitchen')
        )
        .runTest();
    })
  
    it('help in the lounge', function() {
      return botTester
        .sendMessageToBot(
          'getting out of my chair',
          t.equipment.confirm.replace('%s', 'in the lounge')
        )
        .sendMessageToBot(
          'yes',
          t.equipment.message.replace('%s', 'in the lounge')
        )
        .runTest();
    })
  
    it('help on the stairs', function() {
      return botTester
        .sendMessageToBot(
          'getting up the stairs',
          t.equipment.confirm.replace('%s', 'on the stairs')
        )
        .sendMessageToBot(
          'yes',
          t.equipment.message.replace('%s', 'on the stairs')
        )
        .runTest();
    })
  
  })
  
  it('Tells me it can\'t understand', function() {
    return botTester
      .sendMessageToBot(
        'Whatever',
        t.did_not_understand.replace('%s', 'Whatever')
      )
      .runTest();
  });
  
  it('Presents me with options the second time round', function() {
    return botTester
      .sendMessageToBot(
        'Whatever',
        t.did_not_understand.replace('%s', 'Whatever')
      )
      .sendMessageToBot(
        'Whatever',
        t.help_chooser.options
      )
      .runTest();
  })
  
});
