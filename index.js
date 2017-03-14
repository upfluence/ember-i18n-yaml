'use strict';

var checker = require('ember-cli-version-checker');

module.exports = {
  name: 'ember-i18n-yaml',

  init: function() {
    if (this._super.init) { this._super.init.apply(this, arguments); }
    checker.assertAbove(this, '0.1.2');
  },

  parentRegistry: null,

  shouldSetupRegistryInIncluded: function() {
    return !checker.isAbove(this, '0.2.0');
  },

  setupPreprocessorRegistry: function(type, registry) {
    console.log(type);
    registry.add('js', {
      name: 'ember-i18n-yaml',
      ext: 'yml',
      _addon: this,
      toTree: function(tree) {
        return require('./translation-compiler')(tree, {});
      }
    });

    if (type === 'parent') {
      this.parentRegistry = registry;
    }
  },

  included: function (app) {
    this._super.included.apply(this, arguments);

    if (this.shouldSetupRegistryInIncluded()) {
      this.setupPreprocessorRegistry('parent', app.registry);
    }
  }
};
