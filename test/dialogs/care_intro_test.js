var helper = require('../test_helper');
var dialogs = require('../../lib/dialogs')
var t = require('../../lib/config')

describe('care_intro', function() {
  let bot;
  let botTester;
  this.timeout(15000);
  
  beforeEach(function() {
    bot = helper.testBot(helper.connector, {
      '/': dialogs.care_intro,
      'helpChooser': dialogs.helpChooser
    })
    botTester = new helper.botTester.BotTester(bot)
  });
  
  it('sends a greeting', function() {
    return botTester
      .sendMessageToBot(
        'hello',
        t.care_intro.line_1
      ).runTest();
  })
  
  context('For you or someone else', function() {
    
    beforeEach(function() {
      botTester.sendMessageToBot(
        'hello',
        t.care_intro.line_1
      )
    })
    
    it('asks me if I live in Newcastle', function() {
      return botTester
        .sendMessageToBot(
          'Me',
          t.care_intro.you_live_in_newcastle
        ).runTest();
    })
    
    it('asks me if the person lives in Newcastle', function() {
      return botTester
        .sendMessageToBot(
          'Someone else',
          t.care_intro.someone_else_live_in_newcastle
        ).runTest();
    })
    
    context('Do you live in Newcastle?', function() {
      
      beforeEach(function() {
        botTester.sendMessageToBot(
          'Me',
          t.care_intro.you_live_in_newcastle
        )
      })
      
      it('moves on if I answer yes', function() {
        return botTester
          .sendMessageToBot(
            'Yes',
            t.care_intro.help_intro
          ).runTest();
      })
      
      it('sends me to gov.uk if I answer no', function() {
        return botTester
          .sendMessageToBot(
            'No',
            t.care_intro.external_council
          ).runTest();
      })
      
      it('sends me to gov.uk if I am not sure', function() {
        return botTester
          .sendMessageToBot(
            'Not sure',
            t.care_intro.check_council
          ).runTest();
      })
      
    })
    
  })


});
