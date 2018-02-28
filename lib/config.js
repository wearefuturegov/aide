yaml = require('js-yaml');
fs = require('fs');

try {
  var config = yaml.safeLoad(fs.readFileSync('config/en.yml', 'utf8'));
} catch (e) {
  console.log(e);
}

module.exports = config
