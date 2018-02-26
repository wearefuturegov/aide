var builder = require('botbuilder');

module.exports = [
  function(session, results) {
    builder.Prompts.text(session, 'What is your first name?');
  },
  function(session, results) {
    session.dialogData.firstName = results.response;
    builder.Prompts.text(session, 'What is your surname?');
  },
  function(session, results) {
    session.dialogData.surname = results.response;
    builder.Prompts.text(session, 'Phone number we can use to contact you?');
  },
  function(session, results) {
    session.dialogData.phoneNumber = results.response;
    firstName = session.dialogData.firstName;
    surname = session.dialogData.surname;
    phoneNumber = session.dialogData.phoneNumber;

    session.send('Thank you. Here\'s the information you\'ve provided')
    session.send(`First Name: ${firstName}`)
    session.send(`Surname: ${surname}`)
    session.send(`Phone Number: ${phoneNumber}`)
    builder.Prompts.confirm(session, 'Just to confirm, is this information correct?');
  },
  function(session, results) {
    if (results.response === true) {
      session.send('Thank you for answering my questions. I have now passed them to the Social Care Direct team.')
      session.endDialog('We have arranged them to call you back. You should expect a call within 2 days.')
    } else {
      session.beginDialog('assessment');
    }
  }
]
