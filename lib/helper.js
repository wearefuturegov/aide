var config = require('./config');

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
  }
}