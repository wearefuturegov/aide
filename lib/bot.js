var builder = require('botbuilder');
var dialogs = require('./dialogs')

var botConstructor = function(connector) {
  var bot = new builder.UniversalBot(connector).set('storage', inMemoryStorage);
  var inMemoryStorage = new builder.MemoryBotStorage();
  var recognizer = new builder.LuisRecognizer(process.env.LUIS_MODEL_URL);

  bot.dialog('/', dialogs.intro);
  bot.dialog('confirm', dialogs.confirm);
  bot.dialog('equipment', dialogs.equipment);
  bot.dialog('equipmentType', dialogs.equipmentType);
  bot.dialog('checkEquipment', dialogs.checkEquipment);
  bot.dialog('payingforcare', dialogs.payingForCare);
  bot.dialog('assessment', dialogs.assessment);
  
  return bot;
}

module.exports = {
  botConstructor: botConstructor
}
