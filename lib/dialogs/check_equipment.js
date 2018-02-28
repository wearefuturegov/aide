var builder = require('botbuilder');

module.exports = [
  function(session, results) {
    builder.Prompts.confirm(session, 'Was that helpful?')
  },
  function(session, results) {
    if (results.response === true) {
      builder.Prompts.confirm(session, 'Great! Glad I could help. Are you interested in finding out more about paying for this equipment?')
    } else {
      session.send('Sorry to hear that. I\'m still learning. Could you maybe try rephrasing your question?')
      session.beginDialog('equipmentType')
    }
  },
  function(session, results) {
    if (results.response === true) {
      session.beginDialog('payingforcare')
    } else {
      builder.Prompts.confirm(session, 'OK. Is there anything else I can help you with?')
    }
  },
  function(session, results) {
    if (results.response === true) {
      session.beginDialog('/')
    } else {
      session.send('No problem, hope you found me useful')
    }
  }
]
