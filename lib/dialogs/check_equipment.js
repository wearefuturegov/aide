var builder = require('botbuilder');
var t = require('../config');
var helper = require('../helper');

module.exports = [
  function(session, results) {
    builder.Prompts.choice(session, t.equipment.what_you_were_looking_for, 'Yes|No', { listStyle: 3 })
  },
  function(session, results) {
    helper.yesNoResponse(results,
      function() {
        builder.Prompts.choice(session, t.equipment.move_to_getting, 'Yes|No', { listStyle: 3 })
      },
      function() {
        session.send(t.rephrase)
        session.beginDialog('equipmentType')
      }
    )
  },
  function(session, results) {
    helper.yesNoResponse(results,
      function() {
        session.beginDialog('gettingEquipment')
      },
      function() {
        builder.Prompts.choice(session, t.equipment.anything_else, 'Yes|No', { listStyle: 3 })
      }
    )
  },
  function(session, results) {
    helper.yesNoResponse(results,
      function() {
        session.beginDialog('/')
      },
      function() {
        session.send(t.end_conversation)
      }
    )
  }
]
