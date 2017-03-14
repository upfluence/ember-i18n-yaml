const yaml = require('js-yaml');

module.exports = {
  compile: function(yamlString) {
    if (!yamlString) {
      return '{}';
    }

    return JSON.stringify(yaml.safeLoad(yamlString), null, 2);
  }
};
