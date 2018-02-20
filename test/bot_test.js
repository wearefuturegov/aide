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
  
  it('Points me to equipment', function() {
    return botTester
      .sendMessageToBot('Need help getting on the toilet', 'OK, I can see you need help with an equipment request, is that right?')
      .runTest();
  });
  
  it('Points me to paying for care', function() {
    return botTester
      .sendMessageToBot('Help me pay for care', 'OK, I can see you need help with paying for care, is that right?')
      .runTest();
  })
});
