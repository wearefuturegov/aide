var builder = require('botbuilder');
var t = require('../config');

module.exports = [
  function (session, args) {
    session.dialogData.dialog = args.dialog;
    builder.Prompts.confirm(session, args.message);
  },
  function (session, results) {
    if (results.response === true) {
      session.beginDialog(session.dialogData.dialog);
    } else {
      session.endDialog(t.rephrase);
    }
  }
]
