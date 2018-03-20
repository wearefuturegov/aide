var builder = require('botbuilder');
var t = require('../config')
var helper = require('../helper')

module.exports = [
  function(session, results) {
    session.send(t.assessment)
    builder.Prompts.choice(session, t.what_you_were_looking_for, 'Yes|No', { listStyle: 3 })
  },
  function(session, results) {
    helper.yesNoResponse(results,
      function() {
        session.send(t.great)
        session.beginDialog('anythingElse')
      },
      function() {
        session.send(t.rephrase)
        session.beginDialog('helpChooser')
      }
    )
  }
]
