var builder = require('botbuilder');
var t = require('../config');

module.exports = [
  function (session, results) {
    builder.Prompts.choice(session, t.equipment.for_you, 'Me|Someone Else', { listStyle: 3 })
  },
  function (session, results) {
    if (results.response.entity == 'Me') {
      builder.Prompts.confirm(session, t.equipment.you_live_in_newcastle)
    } else {
      builder.Prompts.confirm(session, t.equipment.someone_else_live_in_newcastle)
    }
  },
  function (session, results) {
    if (results.response === true) {
      session.send(t.equipment.kind_of_help);
      session.beginDialog('equipmentType')
    } else {
      session.endDialog(t.equipment.external_council);
    }
  }
]
