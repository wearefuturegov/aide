var builder = require('botbuilder');
var t = require('../config').care_intro

module.exports = [
  function(session, results) {
    session.send(t.line_1)
    session.send(t.line_2)
    session.send(t.line_3)
    builder.Prompts.choice(session, t.for_you, 'Me|Someone Else', { listStyle: 3 })
  },
  function (session, results) {
    if (results.response.entity == 'Me') {
      builder.Prompts.choice(session, t.you_live_in_newcastle, 'Yes|No|Not sure', { listStyle: 3 })
    } else {
      builder.Prompts.choice(session, t.someone_else_live_in_newcastle, 'Yes|No|Not sure', { listStyle: 3 })
    }
  },
  function (session, results) {
    if (results.response.entity === 'Yes') {
      session.send(t.help_intro)
      session.beginDialog('helpChooser')
    } else if (results.response.entity === 'No') {
      session.endDialog(t.external_council);
    } else {
      session.endDialog(t.check_council);
    }
  }
]
