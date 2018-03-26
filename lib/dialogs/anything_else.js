var path = require('path');

var builder = require('botbuilder');
var helper = require(path.resolve('lib', 'helper'));
var t = require(path.resolve('lib', 'config'));

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
