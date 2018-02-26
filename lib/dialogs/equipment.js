var builder = require('botbuilder');

module.exports = [
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
]
