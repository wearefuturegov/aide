var builder = require('botbuilder');
var t = require('../config');

module.exports = [
  function (session, args) {
    builder.Prompts.confirm(session, t.anything_else);
  },
  function (session, results) {
    if (results.response === true) {
      session.send(t.help_intro)
      session.beginDialog('helpChooser')
    } else {
      session.endDialog(t.end_conversation);
    }
  }
]
