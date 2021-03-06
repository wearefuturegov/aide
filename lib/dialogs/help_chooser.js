var path = require('path');

var builder = require('botbuilder');
var recognizer = new builder.LuisRecognizer(process.env.LUIS_MODEL_URL);
var t = require(path.resolve('lib', 'config'))

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
  .matches('assessment', function(session) {
    session.beginDialog('confirm', {
      message: t.help_chooser.confirm.assessment,
      dialog: 'assessment'
    });
  })
  .matches('gettingEquipment', function(session) {
    session.beginDialog('confirm', {
      message: t.help_chooser.confirm.getting_equipment,
      dialog: 'gettingEquipment'
    });
  })
  .matchesAny(equipmentTypes, function(session, args) {
    session.beginDialog('confirmEquipment', {
      intent: args.intent
    })
  })
  .onDefault(function(session) {
    if (session.dialogData.tried == true) {
      session.send(t.help_chooser.options)
    } else {
      session.dialogData.tried = true
      session.send(t.did_not_understand.replace('%s', session.message.text));
    }
  });
