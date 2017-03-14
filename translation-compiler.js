'use strict';

const fs = require('fs');
const utils = require('./utils');
const Filter = require('broccoli-persistent-filter');

function TranslationCompiler (inputTree, _options) {
  if (!(this instanceof TranslationCompiler)) {
    return new TranslationCompiler(inputTree, _options);
  }

  var options = _options || {};
  if (!options.hasOwnProperty('persist')) {
    options.persist = true;
  }

  Filter.call(this, inputTree, options); // this._super()

  this.options = options || {};
  this.inputTree = inputTree;
}

TranslationCompiler.prototype = Object.create(Filter.prototype);
TranslationCompiler.prototype.constructor = TranslationCompiler;
TranslationCompiler.prototype.extensions = ['yml'];
TranslationCompiler.prototype.targetExtension = 'js';

TranslationCompiler.prototype.baseDir = function() {
  return __dirname;
};

TranslationCompiler.prototype.canProcessFile = function (relativePath) {
  return relativePath.indexOf('locales/') !== -1;
};

TranslationCompiler.prototype.processString = function (string, relativePath) {
  return `define('${relativePath.replace('.yml', '')}', ['exports'], function (exports) {
  exports['default'] = ${utils.compile(string)};
});`;
};

TranslationCompiler.prototype.cacheKeyProcessString = function(string, relativePath) {
  return Filter.prototype.cacheKeyProcessString.call(this, string, relativePath);
};

module.exports = TranslationCompiler;
