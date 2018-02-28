var helper = require('../test_helper');
var dialogs = require('../../lib/dialogs')

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
        'Is this for you or someone else?'
      ).runTest();
  })
  
  context('For you or someone else', function() {
    
    beforeEach(function() {
      botTester.sendMessageToBot(
        'Yes',
        'Is this for you or someone else?'
      )
    })
    
    it('asks me if I live in Newcastle', function() {
      return botTester
        .sendMessageToBot(
          'Me',
          'Do you live in Newcastle?'
        ).runTest();
    })
    
    it('asks me if the person lives in Newcastle', function() {
      return botTester
        .sendMessageToBot(
          'Someone else',
          'Does the person live in Newcastle?'
        ).runTest();
    })
    
  })
  
  context('living in Newcastle', function() {
    
    beforeEach(function() {
      botTester.sendMessageToBot(
        'Yes',
        'Is this for you or someone else?'
      )
      .sendMessageToBot(
        'Me',
        'Do you live in Newcastle?'
      )
    })
    
    context('yes', function() {
    
      it('asks me what help I need', function() {
        return botTester
          .sendMessageToBot(
            'yes',
            'What kind of help do you need? For example, do you need help with bathing or eating, or do you have an audio or visual impairment?'
          ).runTest();
      })
      
    })
    
    context('no', function() {
      
      it('tells me it cannot help', function() {
        return botTester
          .sendMessageToBot(
            'no',
            'I am only able to advise residents of Newcastle because all my advice is local to the area. Please contact you local authority or local resources for information that could help you in your area.'
          ).runTest();
      })
      
    })
    
    
  })
  
});
