var builder = require('botbuilder');
var recognizer = new builder.LuisRecognizer(process.env.LUIS_MODEL_URL);
  
module.exports = new builder.IntentDialog({ recognizers: [recognizer] })
  .matches('equipment', function(session) {
    session.beginDialog('confirm', {
      message: 'OK, I can see you need help with an equipment request, is that right?',
      dialog: 'equipment'
    });
  })
  .matches('payingforcare', function(session) {
    session.beginDialog('confirm', {
      message: 'OK, I can see you need help with paying for care, is that right?',
      dialog: 'payingforcare'
    });
  })
  .matches('None', function(session) {
    session.send('Hello, I am your Newcastle City Council Social Care Direct virtual assistant')
    session.send('I can currently help with equipment requests and how to pay for care')
    session.send('How can I help you today?')
  })
  .onDefault(function(session) {
    session.send('Sorry, I did not understand \'%s\'.', session.message.text);
  });
