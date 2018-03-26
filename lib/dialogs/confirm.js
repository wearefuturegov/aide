var path = require('path');

var builder = require('botbuilder');
var t = require(path.resolve('lib', 'config'));
var helper = require(path.resolve('lib', 'helper'));

module.exports = [
  function (session, args) {
    session.dialogData.dialog = args.dialog;
    builder.Prompts.choice(session, args.message, 'Yes|No', { listStyle: 3 })
  },
  function (session, results) {
    helper.yesNoResponse(results,
      function() {
        session.beginDialog(session.dialogData.dialog);
      },
      function() {
        session.endDialog(t.rephrase);
      }
    )
  }
]
