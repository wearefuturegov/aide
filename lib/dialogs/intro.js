var builder = require('botbuilder');
var recognizer = new builder.LuisRecognizer(process.env.LUIS_MODEL_URL);
var t = require('../config')

module.exports = new builder.IntentDialog({ recognizers: [recognizer] })
  .matches('equipment', function(session) {
    session.beginDialog('confirm', {
      message: t.intro.confirm.equipment,
      dialog: 'equipment'
    });
  })
  .matches('payingforcare', function(session) {
    session.beginDialog('confirm', {
      message: t.intro.confirm.paying,
      dialog: 'payingforcare'
    });
  })
  .matches('None', function(session) {
    session.send(t.intro.line_1)
    session.send(t.intro.line_2)
    session.send(t.intro.line_3)
  })
  .onDefault(function(session) {
    session.send('Sorry, I did not understand \'%s\'.', session.message.text);
  });
