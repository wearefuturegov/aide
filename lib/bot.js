var builder = require('botbuilder');
var dialogs = require('./dialogs')

var botConstructor = function(connector) {
  var bot = new builder.UniversalBot(connector).set('storage', inMemoryStorage);
  var inMemoryStorage = new builder.MemoryBotStorage();

  bot.dialog('/', dialogs.intro);
  bot.dialog('careIntro', dialogs.care_intro);
  bot.dialog('helpChooser', dialogs.helpChooser);
  bot.dialog('confirm', dialogs.confirm);
  bot.dialog('equipment', dialogs.equipment);
  bot.dialog('equipmentType', dialogs.equipmentType);
  bot.dialog('checkEquipment', dialogs.checkEquipment);
  bot.dialog('gettingEquipment', dialogs.gettingEquipment);
  bot.dialog('assessment', dialogs.assessment);
  bot.dialog('confirmEquipment', dialogs.confirmEquipment);
  bot.dialog('anythingElse', dialogs.anythingElse);

  return bot;
}

module.exports = {
  botConstructor: botConstructor
}
