var path = require('path');

var builder = require('botbuilder');
var config = require(path.resolve('lib', 'config'));
var helper = require(path.resolve('lib', 'helper'))

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
