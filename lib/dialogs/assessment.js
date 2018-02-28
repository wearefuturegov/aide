var builder = require('botbuilder');
var t = require('../config')

module.exports = [
  function(session, results) {
    builder.Prompts.text(session, t.assessment.first_name);
  },
  function(session, results) {
    session.dialogData.firstName = results.response;
    builder.Prompts.text(session, t.assessment.surname);
  },
  function(session, results) {
    session.dialogData.surname = results.response;
    builder.Prompts.text(session, t.assessment.phone_number);
  },
  function(session, results) {
    session.dialogData.phoneNumber = results.response;
    firstName = session.dialogData.firstName;
    surname = session.dialogData.surname;
    phoneNumber = session.dialogData.phoneNumber;

    session.send(t.assessment.info)
    session.send(`First Name: ${firstName}`)
    session.send(`Surname: ${surname}`)
    session.send(`Phone Number: ${phoneNumber}`)
    builder.Prompts.confirm(session, t.assessment.confirm);
  },
  function(session, results) {
    if (results.response === true) {
      session.send('')
      session.endDialog(t.assessment.thank_you)
    } else {
      session.beginDialog('assessment');
    }
  }
]
