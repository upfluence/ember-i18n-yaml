const yaml = require('js-yaml');

module.exports = {
  toJson: function(yamlString) {
    return JSON.stringify(yaml.safeLoad(yamlString), null, 4);
  }
};
