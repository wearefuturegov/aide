var builder = require('botbuilder');
var helper = require('../helper');
var t = require('../config');

module.exports = [
  function (session, args) {
    builder.Prompts.choice(session, t.anything_else, 'Yes|No', { listStyle: 3 })
  },
  function (session, results) {
    helper.yesNoResponse(results,
      function() {
        session.send(t.care_intro.help_intro)
        session.beginDialog('helpChooser')
      },
      function() {
        session.endDialog(t.end_conversation);
      }
    )
  }
]
