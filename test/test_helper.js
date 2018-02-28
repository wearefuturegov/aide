require('dotenv').config()

var botBuilder = require('botbuilder');
var botTester = require('bot-tester');
var replay  = require('replay');

replay.fixtures = __dirname + '/fixtures';

var connector = new botTester.TestConnector({
  defaultAddress: botBuilder.IAddress
});

var testBot = function(connector, dialogs) {
  var bot = new botBuilder.UniversalBot(connector).set('storage', inMemoryStorage);
  var inMemoryStorage = new botBuilder.MemoryBotStorage();
  
  for (path in dialogs) {
    bot.dialog(path, dialogs[path]);
  }
  
  return bot;
}

module.exports = {
  connector: connector,
  testBot: testBot,
  botTester: botTester
}
