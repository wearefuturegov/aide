var builder = require('botbuilder');
var recognizer = new builder.LuisRecognizer(process.env.LUIS_MODEL_URL);
var t = require('../config').help_chooser

var equipmentTypes = [
  'equipment.bathroom',
  'equipment.bedroom',
  'equipment.diningroom',
  'equipment.garden',
  'equipment.office',
  'equipment.kitchen',
  'equipment.lounge',
  'equipment.stairs'
]

module.exports = new builder.IntentDialog({ recognizers: [recognizer] })
  .matches('equipment', function(session) {
    session.beginDialog('confirm', {
      message: t.confirm.equipment,
      dialog: 'equipmentType'
    });
  })
  .matches('payingforcare', function(session) {
    session.beginDialog('confirm', {
      message: t.confirm.paying,
      dialog: 'payingforcare'
    });
  })
  .matchesAny(equipmentTypes, function(session, args) {
    session.beginDialog('confirmEquipment', {
      intent: args.intent
    })
  })
  .onDefault(function(session) {
    if (session.dialogData.tried == true) {
      session.send(t.options)
    } else {
      session.dialogData.tried = true
      session.send('Sorry, I did not understand \'%s\'. Please try rephrasing your request', session.message.text);
    }
  });
