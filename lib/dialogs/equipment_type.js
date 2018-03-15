var builder = require('botbuilder');
var recognizer = new builder.LuisRecognizer(process.env.LUIS_MODEL_URL);
var config = require('../config')

var equipmentInfo = function(session, args) {
  var intent = args.intent.split('.');
  session.send(config.equipment[intent[1]].message);
  session.send(config.equipment[intent[1]].link);
  session.beginDialog('checkEquipment');
}

module.exports = new builder.IntentDialog({ recognizers: [recognizer] })
  .onBegin(function(session) {
    session.send(config.equipment.kind_of_help)
  })
  .matches('equipment.bathroom', function(session, args) {
    equipmentInfo(session, args);
  })
  .matches('equipment.bedroom', function(session, args) {
    equipmentInfo(session, args);
  })
  .matches('equipment.diningroom', function(session, args) {
    equipmentInfo(session, args)
  })
  .matches('equipment.garden', function(session, args) {
    equipmentInfo(session, args)
  })
  .matches('equipment.office', function(session, args) {
    equipmentInfo(session, args)
  })
  .matches('equipment.kitchen', function(session, args) {
    equipmentInfo(session, args)
  })
  .matches('equipment.lounge', function(session, args) {
    equipmentInfo(session, args)
  })
  .matches('equipment.stairs', function(session, args) {
    equipmentInfo(session, args)
  })
  .onDefault(function(session) {
    session.send('Sorry, I did not understand \'%s\'. Could you maybe rephrase?', session.message.text);
  })
  
