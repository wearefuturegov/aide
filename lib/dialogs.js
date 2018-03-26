var path = require('path');

var dialogPath = function(fileName) {
  return path.resolve('lib', 'dialogs', fileName);
}

module.exports = {
  assessment: require(dialogPath('assessment')),
  confirm: require(dialogPath('confirm')),
  confirmEquipment: require(dialogPath('confirm_equipment')),
  intro: require(dialogPath('care_intro')),
  helpChooser: require(dialogPath('help_chooser')),
  equipmentType: require(dialogPath('equipment_type')),
  care_intro: require(dialogPath('care_intro')),
  checkEquipment: require(dialogPath('check_equipment')),
  gettingEquipment: require(dialogPath('getting_equipment')),
  anythingElse: require(dialogPath('anything_else')),
}
