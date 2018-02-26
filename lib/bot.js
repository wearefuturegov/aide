var builder = require('botbuilder');

var botConstructor = function(connector) {
  var bot = new builder.UniversalBot(connector).set('storage', inMemoryStorage);
  var inMemoryStorage = new builder.MemoryBotStorage();
  var recognizer = new builder.LuisRecognizer(process.env.LUIS_MODEL_URL);

  var intents = new builder.IntentDialog({ recognizers: [recognizer] })
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

  bot.dialog('/', intents);

  bot.dialog('confirm', [
    function (session, args) {
      session.dialogData.dialog = args.dialog;
      builder.Prompts.confirm(session, args.message);
    },
    function (session, results) {
      if (results.response === true) {
        session.beginDialog(session.dialogData.dialog);
      } else {
        session.endDialog('Sorry about that. I\'m still learning. Maybe try resphrasing your request?');
      }
    }
  ])

  bot.dialog('equipment', [
    function (session, results) {
      builder.Prompts.choice(session, 'Is this for you or someone else?', 'Me|Someone Else', { listStyle: 3 })
    },
    function (session, results) {
      if (results.response.entity == 'Me') {
        builder.Prompts.confirm(session, 'Do you live in Newcastle?')
      } else {
        builder.Prompts.confirm(session, 'Does the person live in Newcastle?')
      }
    },
    function (session, results) {
      if (results.response === true) {
        session.send('What kind of help do you need? For example, do you need help with bathing or eating, or do you have an audio or visual impairment?');
        session.beginDialog('equipmentType')
      } else {
        session.endDialog('I am only able to advise residents of Newcastle because all my advice is local to the area. Please contact you local authority or local resources for information that could help you in your area.');
      }
    }
  ])
  
  bot.dialog('equipmentType',
    new builder.IntentDialog({ recognizers: [recognizer] })
      .matches('equipment.bathroom', function(session) {
        session.send('OK, I\'ve found some information on equipment that can help you in the bathroom on the My Equipment Newcastle website');
        session.send('https://www.myequipmentnewcastle.org.uk/catalogue/Bathroom')
      })
      .matches('equipment.bedroom', function(session) {
        session.send('OK, I\'ve found some information on equipment that can help you in the bedroom on the My Equipment Newcastle website');
        session.send('https://www.myequipmentnewcastle.org.uk/catalogue/Bedroom')
      })
      .matches('equipment.diningroom', function(session) {
        session.send('OK, I\'ve found some information on equipment that can help you in the dining room on the My Equipment Newcastle website');
        session.send('https://www.myequipmentnewcastle.org.uk/catalogue/DiningRoom')
      })
      .matches('equipment.garden', function(session) {
        session.send('OK, I\'ve found some information on equipment that can help you in the garden on the My Equipment Newcastle website');
        session.send('https://www.myequipmentnewcastle.org.uk/catalogue/Garden')
      })
      .matches('equipment.office', function(session) {
        session.send('OK, I\'ve found some information on equipment that can help you in the office on the My Equipment Newcastle website');
        session.send('https://www.myequipmentnewcastle.org.uk/catalogue/Office')
      })
      .matches('equipment.kitchen', function(session) {
        session.send('OK, I\'ve found some information on equipment that can help you in the kitchen on the My Equipment Newcastle website');
        session.send('https://www.myequipmentnewcastle.org.uk/catalogue/Kitchen')
      })
      .matches('equipment.lounge', function(session) {
        session.send('OK, I\'ve found some information on equipment that can help you in the lounge on the My Equipment Newcastle website');
        session.send('https://www.myequipmentnewcastle.org.uk/catalogue/Lounge')
      })
      .matches('equipment.stairs', function(session) {
        session.send('OK, I\'ve found some information on equipment that can help you on the stairs on the My Equipment Newcastle website');
        session.send('https://www.myequipmentnewcastle.org.uk/catalogue/Stairs')
      })
      .onDefault(function(session) {
        session.send('Sorry, I did not understand \'%s\'. Could you maybe rephrase?', session.message.text);
      })
  )


  bot.dialog('payingforcare', [
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
  ])

  bot.dialog('assessment', [
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
  ])
  
  return bot;
}

module.exports = {
  botConstructor: botConstructor
}
