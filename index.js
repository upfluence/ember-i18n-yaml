'use strict';

const TranslationCompiler = require('./translation-compiler');

module.exports = {
  name: 'ember-i18n-yaml',

  treeForApp: function() {
    return new TranslationCompiler(this.app.trees.app, {});
  }
};
