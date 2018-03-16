var builder = require('botbuilder');
var t = require('../config')

module.exports = [
  function(session, results) {
    session.send(t.getting_equipment.info)
    builder.Prompts.choice(session, t.getting_equipment.self_or_council, t.getting_equipment.choices.join('|'), { listStyle: 3 })
  },
  function(session, results) {
    if (results.response.entity == t.getting_equipment.choices[0]) {
      session.send(t.getting_equipment.access_myself)
      session.beginDialog('anythingElse')
    } else if (results.response.entity == t.getting_equipment.choices[1]) {
      session.send(t.getting_equipment.council_support)
      builder.Prompts.confirm(session, t.getting_equipment.assessment);
    }
  },
  function (session, results) {
    if (results.response === true) {
      session.beginDialog('assessment')
    } else {
      session.beginDialog('anythingElse')
    }
  }
]
