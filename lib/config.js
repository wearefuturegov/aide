yaml = require('js-yaml');
fs = require('fs');

try {
  var equipment = yaml.safeLoad(fs.readFileSync('config/equipment.yml', 'utf8'));
} catch (e) {
  console.log(e);
}

module.exports = {
  equipment: equipment
}
