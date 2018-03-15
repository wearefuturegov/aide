var builder = require('botbuilder');
var config = require('../config');
var helper = require('../helper')

module.exports = [
  function (session, args) {
    session.dialogData.equipment = helper.equipmentInfo(args);
    builder.Prompts.confirm(session, session.dialogData.equipment.confirm);
  },
  function (session, results) {
    if (results.response === true) {
      helper.sendEquipment(session, session.dialogData.equipment)
    } else {
      session.endDialog(config.rephrase);
    }
  }
]
