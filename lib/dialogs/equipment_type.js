var builder = require('botbuilder');
var recognizer = new builder.LuisRecognizer(process.env.LUIS_MODEL_URL);
var config = require('../config')
var helper = require('../helper')

var equipmentResponse = function(session, args) {
  data = helper.equipmentInfo(args);
  helper.sendEquipment(session, data);
}

module.exports = new builder.IntentDialog({ recognizers: [recognizer] })
  .onBegin(function(session) {
    session.send(config.equipment.kind_of_help)
  })
  .matches('equipment.bathroom', function(session, args) {
    equipmentResponse(session, args);
  })
  .matches('equipment.bedroom', function(session, args) {
    equipmentResponse(session, args);
  })
  .matches('equipment.diningroom', function(session, args) {
    equipmentResponse(session, args);
  })
  .matches('equipment.garden', function(session, args) {
    equipmentResponse(session, args);
  })
  .matches('equipment.office', function(session, args) {
    equipmentResponse(session, args);
  })
  .matches('equipment.kitchen', function(session, args) {
    equipmentResponse(session, args);
  })
  .matches('equipment.lounge', function(session, args) {
    equipmentResponse(session, args);
  })
  .matches('equipment.stairs', function(session, args) {
    equipmentResponse(session, args);
  })
  .onDefault(function(session) {
    session.send(config.did_not_understand, session.message.text);
  })
  
