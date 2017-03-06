/* jshint node: true */
'use strict';

var merge = require('deepmerge');
var I18nYamlCompiler = require('./lib/i18n-yaml-compiler');

module.exports = {
  name: 'Ember i18n Yaml',
  project: this.project,

  i18nYamlConfig: function () {
    var app = this.app;

    if (app && !app.options && app.app) {
      app = app.app;
    }

    return merge({
        sourceDir: './config/locales',
        distDir: './app/locales',
        defaultLocal: 'en'
      }, (app && app.options.i18nYaml) || {});
  },

  treeForApp: function() {
    const compiler = new I18nYamlCompiler(this.i18nYamlConfig(), this.ui);
    compiler.compile();
  }
};
