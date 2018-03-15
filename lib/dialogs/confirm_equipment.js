var builder = require('botbuilder');
var config = require('../config');

var equipmentInfo = function(session, data) {
  session.send(config.equipment.message, data.intentName);
  session.send(config.equipment[data.intent].link);
  session.beginDialog('checkEquipment');
}

module.exports = [
  function (session, args) {
    session.dialogData.intent = args.intent.split('.')[1];
    session.dialogData.intentName = config.equipment[session.dialogData.intent].name
    builder.Prompts.confirm(session, config.equipment.confirm.replace('%s', session.dialogData.intentName));
  },
  function (session, results) {
    if (results.response === true) {
      equipmentInfo(session, session.dialogData)
    } else {
      session.endDialog(config.rephrase);
    }
  }
]
