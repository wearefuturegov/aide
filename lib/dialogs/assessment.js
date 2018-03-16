var builder = require('botbuilder');
var t = require('../config')

module.exports = [
  function(session, results) {
    session.send(t.assessment)
    builder.Prompts.confirm(session, t.what_you_were_looking_for)
  },
  function(session, results) {
    if (results.response === true) {
      session.send(t.great)
      session.beginDialog('anythingElse')
    } else {
      session.send(t.rephrase)
      session.beginDialog('helpChooser')
    }
  }
]
