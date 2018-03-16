var builder = require('botbuilder');
var t = require('../config')

module.exports = [
  function(session, results) {
    session.send(t.assessment)
    session.beginDialog('anythingElse')
  }
]
