var builder = require('botbuilder');
var recognizer = new builder.LuisRecognizer(process.env.LUIS_MODEL_URL);
var t = require('../config').help_chooser

module.exports = new builder.IntentDialog({ recognizers: [recognizer] })
  .matches('equipment', function(session) {
    session.beginDialog('confirm', {
      message: t.confirm.equipment,
      dialog: 'equipment'
    });
  })
  .matches('payingforcare', function(session) {
    session.beginDialog('confirm', {
      message: t.confirm.paying,
      dialog: 'payingforcare'
    });
  })
  .onDefault(function(session) {
    if (session.dialogData.tried == true) {
      session.send(t.options)
    } else {
      session.dialogData.tried = true
      session.send('Sorry, I did not understand \'%s\'. Please try rephrasing your request', session.message.text);
    }
  });
