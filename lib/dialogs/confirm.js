var builder = require('botbuilder');

module.exports = [
  function (session, args) {
    session.dialogData.dialog = args.dialog;
    builder.Prompts.confirm(session, args.message);
  },
  function (session, results) {
    if (results.response === true) {
      session.beginDialog(session.dialogData.dialog);
    } else {
      session.endDialog('Sorry about that. I\'m still learning. Maybe try resphrasing your request?');
    }
  }
]
