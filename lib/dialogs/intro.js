var builder = require('botbuilder');

module.exports = [
  function(session) {
    session.beginDialog('care_intro')
  }
]
