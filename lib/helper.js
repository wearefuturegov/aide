var path = require('path');
var builder = require('botbuilder');

var config = require(path.resolve('lib', 'config'));

module.exports = {
  equipmentInfo: function(data) {
    intent = data.intent.split('.')[1];
    intentName = config.equipment[intent].name
    return {
      confirm: config.equipment.confirm.replace('%s', intentName),
      message: config.equipment.message.replace('%s', intentName),
      link: config.equipment[intent].link
    }
  },
  sendEquipment: function(session, data) {
    session.send(data.message);
    session.send(data.link);
    session.beginDialog('checkEquipment');
  },
  yesNoResponse: function(results, success, failure) {
    if (results.response.entity.match(/^y.+/i)) {
      success();
    } else if (results.response.entity.match(/^n.+/i)) {
      failure();
    } else {
      session.send(config.yes_no_did_not_understand)
    }
  }
}
