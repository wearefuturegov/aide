var builder = require('botbuilder');
var t = require('../config')

module.exports = [
  function(session, results) {
    session.send(t.payingforcare.info_1)
    session.send(t.payingforcare.info_2)
    session.send(t.payingforcare.info_3)
    session.send(t.payingforcare.info_4)
  },
  function(session, results) {
    if (results.response === true) {
      session.send(t.assessment.intro)
      session.beginDialog('assessment');
    } else {
      session.endDialog(t.end_conversation)
    }
  }
]
