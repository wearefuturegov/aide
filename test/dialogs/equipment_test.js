var helper = require('../test_helper');
var dialogs = require('../../lib/dialogs')
var t = require('../../lib/config')

describe('equipment', function() {
  let bot;
  let botTester;
  this.timeout(15000);
  
  beforeEach(function() {
    bot = helper.testBot(helper.connector, {
      '/': dialogs.equipment,
      'equipmentType': dialogs.equipmentType,
    })
    botTester = new helper.botTester.BotTester(bot)
  });
  
  it('asks me if the equipment is for me or someone else', function() {
    return botTester
      .sendMessageToBot(
        'Yes',
        t.equipment.for_you
      ).runTest();
  })
  
  context('For you or someone else', function() {
    
    beforeEach(function() {
      botTester.sendMessageToBot(
        'Yes',
        t.equipment.for_you
      )
    })
    
    it('asks me if I live in Newcastle', function() {
      return botTester
        .sendMessageToBot(
          'Me',
          t.equipment.you_live_in_newcastle
        ).runTest();
    })
    
    it('asks me if the person lives in Newcastle', function() {
      return botTester
        .sendMessageToBot(
          'Someone else',
          t.equipment.someone_else_live_in_newcastle
        ).runTest();
    })
    
  })
  
  context('living in Newcastle', function() {
    
    beforeEach(function() {
      botTester.sendMessageToBot(
        'Yes',
        t.equipment.for_you
      )
      .sendMessageToBot(
        'Me',
        t.equipment.you_live_in_newcastle
      )
    })
    
    context('yes', function() {
    
      it('asks me what help I need', function() {
        return botTester
          .sendMessageToBot(
            'yes',
            t.equipment.kind_of_help
          ).runTest();
      })
      
    })
    
    context('no', function() {
      
      it('tells me it cannot help', function() {
        return botTester
          .sendMessageToBot(
            'no',
            t.equipment.external_council
          ).runTest();
      })
      
    })
    
    
  })
  
});
