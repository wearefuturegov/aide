var builder = require('botbuilder');
var config = require('../config');
var helper = require('../helper')

module.exports = [
  function (session, args) {
    session.dialogData.equipment = helper.equipmentInfo(args);
    builder.Prompts.choice(session, session.dialogData.equipment.confirm, 'Yes|No', { listStyle: 3 })
  },
  function (session, results) {
    helper.yesNoResponse(results,
      function() {
        helper.sendEquipment(session, session.dialogData.equipment)
      },
      function() {
        session.endDialog(config.rephrase);
      }
    )
  }
]
