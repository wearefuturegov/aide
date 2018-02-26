var builder = require('botbuilder');

module.exports = [
  function(session, results) {
    session.send('Here is some information that can help you learn more about paying for care:')
    session.send('https://www.informationnow.org.uk/article/paying-for-care/')
    session.send('You can also get a financial assessment completed by the council to check if you are eligible for financial support.')
    builder.Prompts.confirm(session, 'Would you like to start an assessment?')
  },
  function(session, results) {
    if (results.response === true) {
      session.send('Great! We need to collect a few pieces of information so that we can pass it onto the Social Care Direct team to followup on your request for assessing payment support available to you.')
      session.beginDialog('assessment');
    } else {
      session.endDialog('OK, have a great day')
    }
  }
]
