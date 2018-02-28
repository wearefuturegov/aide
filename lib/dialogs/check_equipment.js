var builder = require('botbuilder');
var t = require('../config');

module.exports = [
  function(session, results) {
    builder.Prompts.confirm(session, t.equipment.what_you_were_looking_for)
  },
  function(session, results) {
    if (results.response === true) {
      builder.Prompts.confirm(session, t.equipment.move_to_payment)
    } else {
      session.send(t.rephrase)
      session.beginDialog('equipmentType')
    }
  },
  function(session, results) {
    if (results.response === true) {
      session.beginDialog('payingforcare')
    } else {
      builder.Prompts.confirm(session, t.equipment.anything_else)
    }
  },
  function(session, results) {
    if (results.response === true) {
      session.beginDialog('/')
    } else {
      session.send(t.end_conversation)
    }
  }
]
