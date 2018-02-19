var builder = require('botbuilder');

var connector = new builder.ChatConnector({
  appId: process.env.MICROSOFT_APP_ID,
  appPassword: process.env.MICROSOFT_APP_PASSWORD
});

var inMemoryStorage = new builder.MemoryBotStorage();
var bot = new builder.UniversalBot(connector).set('storage', inMemoryStorage);
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
      builder.Prompts.text(session, 'I found some equipment I think might help with issues of mobility around using the toilet. Please have a look below.')
      var msg = new builder.Message(session);
      msg.attachmentLayout(builder.AttachmentLayout.carousel)
      msg.attachments([
          new builder.HeroCard(session)
              .title("Cosby Commode Seat - Standard (with frame)")
              .images([builder.CardImage.create(session, 'https://www.adlsmartcare.co.uk/adlsmartcare/Upload/products/ge64030.jpg')])
              .buttons([
                  builder.CardAction.openUrl(session, 'https://www.myequipmentnewcastle.org.uk/catalogue/Bathroom/toilet-frames-and-surrounds/toilet-surround-padded-arms--adjustable-height', "Buy")
              ]),
          new builder.HeroCard(session)
              .title("Ashby Raised Toilet Seat 6in or 15 cm Deluxe (with easy screw fixings and lid)")
              .images([builder.CardImage.create(session, 'https://www.adlsmartcare.co.uk/adlsmartcare/Upload/products/Ashby.jpg')])
              .buttons([
                  builder.CardAction.openUrl(session, 'https://www.myequipmentnewcastle.org.uk/catalogue/Bathroom/raised-toilet-seats/ashby-raised-toilet-seat-6in-or-15-cm-deluxe-with-easy-screw-fixings-and-lid', "Buy")
              ])
      ]);
      session.send(msg);
      builder.Prompts.confirm(session, "Are you interested to learn about how you can pay for this equipment?");
    } else {
      session.endDialog('I am only able to advise residents of Newcastle because all my advice is local to the area. Please contact you local authority or local resources for information that could help you in your area.');
    }
  },
  function (session, results) {
    if (results.response === true) {
      session.beginDialog('payingforcare');
    } else {
      builder.Prompts.confirm('OK, is there anything else I can help you with?');
    }
  },
  function (session, results) {
    if (results.response === true) {
      session.endDialog('Cool')
    } else {
      session.endDialog('OK, have a great day')
    }
  }
])


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
    console.log(session.dialogData)
    builder.Prompts.text(session, 'What is your surname?');
  },
  function(session, results) {
    session.dialogData.surname = results.response;
    console.log(session.dialogData)

    builder.Prompts.text(session, 'Phone number we can use to contact you?');
  },
  function(session, results) {
    session.dialogData.phoneNumber = results.response;
    firstName = session.dialogData.firstName;
    surname = session.dialogData.surname;
    phoneNumber = session.dialogData.phoneNumber;

    session.send('Thank you')
    builder.Prompts.confirm(session, 'Just to confirm, is this information correct?');
    session.send(`First Name: ${firstName}`)
    session.send(`Surname: ${surname}`)
    session.send(`Phone Number: ${phoneNumber}`)
  },
  function(session, results) {
    if (results.response === true) {
      session.send('Thank you for answering my questions. I have now passed them to the Social Care Direct team.')
      session.send('We have arranged them to call you back. You should expect a call within 2 days.')
    } else {
      session.beginDialog('assessment');
    }
  }
])

var connectorListener = connector.listen();
function listen() {
  return function (req, res) {
    connectorListener(req, res);
  };
}

module.exports = {
  listen: listen,
  _private: {
    bot: bot
  }
}
