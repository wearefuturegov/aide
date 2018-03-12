var builder = require('botbuilder');
var t = require('../config')

module.exports = [
  function(session, results) {
    session.send(t.payingforcare.info_1)
    session.send(t.payingforcare.info_2)
    // TODO: What should we say here?
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
